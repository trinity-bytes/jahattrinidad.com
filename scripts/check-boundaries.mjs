#!/usr/bin/env node
/**
 * Mechanized enforcement of the one architectural rule this project relies
 * on: pages -> sections -> content -> ui/lib, never reversed, with a single
 * call site for astro:content. node:fs + node:path only, zero dependencies,
 * no parser. Wired as the first (cheapest) step of `npm run check`.
 *
 * Algorithm: design.md section 5. Traces: specs/architecture-boundaries.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, extname, relative, resolve } from 'node:path';

const CODE = new Set(['.astro', '.ts', '.tsx', '.mjs', '.js', '.mdx']);

// ── Step 3 — line-anchored import extraction regexes ──
const FROM_RE = /^[ \t]*(?:import|export)\b[^'"]*?\bfrom[ \t]*['"]([^'"]+)['"]/gm;
const BARE_RE = /^[ \t]*import[ \t]*['"]([^'"]+)['"]/gm;
const DYNAMIC_RE = /\bimport[ \t]*\([ \t]*['"]([^'"]+)['"]/g;
const GLOB_RE = /\bimport\.meta\.glob[ \t]*\(/g;

// ── Step 2 — classify into a layer, longest-prefix-first ──
const LAYER_ORDER = [
  { id: 'seam', kind: 'exact', match: 'src/lib/content.ts' },
  { id: 'lib', kind: 'prefix', match: 'src/lib/' },
  { id: 'ui', kind: 'prefix', match: 'src/components/ui/' },
  { id: 'content', kind: 'prefix', match: 'src/components/content/' },
  { id: 'sections', kind: 'prefix', match: 'src/components/sections/' },
  { id: 'layouts', kind: 'prefix', match: 'src/layouts/' },
  { id: 'pages', kind: 'prefix', match: 'src/pages/' },
  { id: 'entry', kind: 'prefix', match: 'src/content/' },
];

function classify(file) {
  for (const layer of LAYER_ORDER) {
    if (layer.kind === 'exact' ? file === layer.match : file.startsWith(layer.match)) {
      return layer.id;
    }
  }
  return null; // skipped — e.g. src/env.d.ts, src/content.config.ts
}

// ── Step 4 — resolve a specifier to an extension-insensitive key ──
function resolveKey(file, spec) {
  const target = spec.startsWith('.')
    ? relative(process.cwd(), resolve(dirname(file), spec)).replaceAll('\\', '/')
    : spec; // bare module: 'astro:content', 'astro/loaders', ...
  return target.replace(/\.(astro|tsx?|m?js|mdx)$/, ''); // extension-insensitive
}

const isTypeOnly = (stmt) => /^(?:import|export)[ \t]+type\b/.test(stmt);

// ── Step 5 — the forbidden-import matrix. Deny always wins. ──
// Rule ids: B1 = single-seam invariant, B2 = one-way layering,
// B3 = ui/ portability, B4 = the bypass closers.
const AC = 'astro:content';
const I18N = 'astro:i18n';

function astroContentDeny(layer, typeOnly) {
  switch (layer) {
    case 'pages':
    case 'layouts':
    case 'entry':
      // any form, including import type
      return { rule: 'B1', reason: `only src/lib/content.ts may import '${AC}'` };
    case 'sections':
    case 'content':
      // value form only; import type is allowed
      if (typeOnly) return null;
      return { rule: 'B1', reason: `only src/lib/content.ts may import '${AC}' at runtime` };
    case 'ui':
      // any form, including import type — tagged B3 (portability), not B1
      return { rule: 'B3', reason: `ui/ must not import '${AC}'` };
    case 'lib':
      // any non-seam lib file: astro:content access belongs only in the seam
      return { rule: 'B1', reason: `only src/lib/content.ts may import '${AC}'` };
    default:
      return null;
  }
}

function fixFor(layer, rule, target) {
  if (rule === 'B3') {
    if (target === AC) return 'a component that knows a collection type belongs in src/components/content/';
    if (target === I18N) return 'src/components/ui/ must stay project-agnostic; move locale-aware logic to a caller';
    return 'src/lib/ is project-aware; a ui/ component that needs it is misclassified — move it to src/components/content/ or pass data as props';
  }
  if (rule === 'B4') {
    if (target === AC) return 'use the named exports from src/lib/content.ts instead of a dynamic import';
    return 'import.meta.glob bypasses the single seam; read content through src/lib/content.ts instead';
  }
  if (rule === 'B1') {
    if (layer === 'sections') return 'sections/ receive props; fetch in the page and pass them down';
    if (layer === 'content') return 'move data fetching to the page/section and pass props, or use `import type` for type-only needs';
    if (layer === 'lib') return 'astro:content access belongs only in src/lib/content.ts (the seam)';
    return 'call the exported functions from src/lib/content.ts instead of importing astro:content directly';
  }
  // B2
  return 'modules must depend only in the direction pages -> sections -> content -> ui/lib';
}

function directionalDeny(layer, target) {
  const rules = {
    lib: [['src/pages/', 'B2'], ['src/layouts/', 'B2'], ['src/components/', 'B2']],
    seam: [['src/pages/', 'B2'], ['src/layouts/', 'B2'], ['src/components/', 'B2']],
    ui: [
      ['src/lib/', 'B3'],
      ['src/pages/', 'B2'],
      ['src/layouts/', 'B2'],
      ['src/components/sections/', 'B2'],
      ['src/components/content/', 'B2'],
    ],
    content: [
      ['src/lib/content', 'B2'],
      ['src/pages/', 'B2'],
      ['src/layouts/', 'B2'],
      ['src/components/sections/', 'B2'],
    ],
    sections: [
      ['src/lib/content', 'B2'],
      ['src/pages/', 'B2'],
      ['src/layouts/', 'B2'],
    ],
    layouts: [
      ['src/lib/content', 'B2'],
      ['src/pages/', 'B2'],
    ],
    pages: [],
    entry: [
      ['src/lib/content', 'B2'],
      ['src/pages/', 'B2'],
      ['src/layouts/', 'B2'],
    ],
  };
  for (const [prefix, rule] of rules[layer] ?? []) {
    const isExact = prefix === 'src/lib/content';
    if (isExact ? target === prefix : target.startsWith(prefix)) {
      return { rule, reason: `${layer}/ must not import from ${prefix}` };
    }
  }
  return null;
}

// Exit 2 is reserved for the checker itself failing (unreadable src/, bad
// invocation) — kept distinct from exit 1 ("a rule was violated") so a
// broken checker never reads as a passing build.
function fail(message) {
  console.error(`check-boundaries: ${message}`);
  process.exit(2);
}

// ── Step 1 — enumerate ──
let files;
try {
  files = readdirSync('src', { recursive: true, withFileTypes: true })
    .filter((d) => d.isFile() && CODE.has(extname(d.name)))
    .map((d) => join(d.parentPath, d.name).replaceAll('\\', '/'));
} catch (err) {
  fail(`could not read src/ — ${err.message}`);
}

const violations = [];

for (const file of files) {
  const layer = classify(file);
  if (!layer) continue;

  let rawText;
  try {
    rawText = readFileSync(file, 'utf8');
  } catch (err) {
    fail(`could not read ${file} — ${err.message}`);
  }

  // .astro files: frontmatter-only, with line-offset tracking. All other
  // extensions (including .mdx, which is executable in its body) are
  // scanned in full.
  let scanText = rawText;
  let lineOffset = 0;
  if (extname(file) === '.astro') {
    const lines = rawText.split('\n');
    const firstFence = lines.findIndex((l) => l.trim() === '---');
    if (firstFence === -1) continue; // no frontmatter, nothing to scan
    const secondFence = lines.findIndex(
      (l, i) => i > firstFence && l.trim() === '---'
    );
    if (secondFence === -1) continue;
    scanText = lines.slice(firstFence + 1, secondFence).join('\n');
    lineOffset = firstFence + 1;
  }

  const lineAt = (index) => lineOffset + scanText.slice(0, index).split('\n').length;

  const record = (spec, typeOnly, atIndex, stmt) => {
    if (spec.endsWith('.css')) return; // not a dependency edge
    const key = resolveKey(file, spec);
    const line = lineAt(atIndex);

    if (key === AC) {
      const deny = astroContentDeny(layer, typeOnly);
      if (deny) {
        violations.push({
          file,
          line,
          rule: deny.rule,
          reason: deny.reason,
          stmt,
          fix: fixFor(layer, deny.rule, AC),
        });
      }
      return;
    }

    if (key === I18N && layer === 'ui') {
      violations.push({
        file,
        line,
        rule: 'B3',
        reason: `ui/ must not import '${I18N}'`,
        stmt,
        fix: fixFor(layer, 'B3', I18N),
      });
      return;
    }

    const dir = directionalDeny(layer, key);
    if (dir) {
      violations.push({
        file,
        line,
        rule: dir.rule,
        reason: dir.reason,
        stmt,
        fix: fixFor(layer, dir.rule, key),
      });
    }
  };

  for (const re of [FROM_RE, BARE_RE]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(scanText))) {
      record(m[1], isTypeOnly(m[0].trimStart()), m.index, m[0].trim());
    }
  }

  // B4 — bypass closers, any layer except seam.
  if (layer !== 'seam') {
    DYNAMIC_RE.lastIndex = 0;
    let dm;
    while ((dm = DYNAMIC_RE.exec(scanText))) {
      const key = resolveKey(file, dm[1]);
      if (key === AC) {
        violations.push({
          file,
          line: lineAt(dm.index),
          rule: 'B4',
          reason: `dynamic import('${AC}') bypasses the single seam`,
          stmt: dm[0].trim(),
          fix: fixFor(layer, 'B4', AC),
        });
      }
    }
    GLOB_RE.lastIndex = 0;
    let gm;
    while ((gm = GLOB_RE.exec(scanText))) {
      violations.push({
        file,
        line: lineAt(gm.index),
        rule: 'B4',
        reason: 'import.meta.glob bypasses the single seam',
        stmt: gm[0].trim(),
        fix: fixFor(layer, 'B4', 'import.meta.glob'),
      });
    }
  }
}

// ── Step 6 — report and exit ──
if (violations.length === 0) {
  const layerCount = new Set(LAYER_ORDER.map((l) => l.id)).size;
  console.log(`✓ boundaries clean — ${files.length} files, ${layerCount} layers, 4 rules.`);
  process.exit(0);
}

for (const v of violations) {
  console.error(`✖ ${v.file}:${v.line}`);
  console.error(`    rule  ${v.rule} — ${v.reason}`);
  console.error(`    stmt  ${v.stmt}`);
  console.error(`    fix   ${v.fix}`);
  console.error('');
}
console.error(`${violations.length} violation${violations.length === 1 ? '' : 's'} in ${files.length} files checked.`);
process.exit(1);
