// Builds /llms.txt (https://llmstxt.org): a plain Markdown map of the site for AI agents.
// Pure on purpose: the endpoint in src/pages/llms.txt.ts gathers the data, this formats it.

export interface LlmsEntry {
  title: string;
  path: string;
  description: string;
}

export interface LlmsInput {
  site: URL;
  name: string;
  summary: string;
  facts: string[];
  pages: LlmsEntry[];
  projects: LlmsEntry[];
  posts: LlmsEntry[];
  profiles: { label: string; url: string }[];
  cv: { label: string; path: string }[];
  email: string;
}

const entryLine = (site: URL, e: LlmsEntry) => `- [${e.title}](${new URL(e.path, site).href}): ${e.description}`;

function section(heading: string, lines: string[]): string[] {
  return lines.length ? [`## ${heading}`, '', ...lines, ''] : [];
}

export function buildLlmsTxt(input: LlmsInput): string {
  const { site } = input;
  return [
    `# ${input.name}`,
    '',
    `> ${input.summary}`,
    '',
    ...input.facts.map((fact) => `- ${fact}`),
    '',
    ...section('Pages', input.pages.map((e) => entryLine(site, e))),
    ...section('Projects', input.projects.map((e) => entryLine(site, e))),
    ...section('Notes', input.posts.map((e) => entryLine(site, e))),
    ...section('Contact and CV', [
      `- Email: ${input.email}`,
      ...input.cv.map((c) => `- [${c.label}](${new URL(c.path, site).href})`),
    ]),
    ...section('Profiles', input.profiles.map((p) => `- [${p.label}](${p.url})`)),
  ].join('\n');
}
