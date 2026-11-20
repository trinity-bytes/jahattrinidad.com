import { defineConfig, fontProviders } from 'astro/config';
import theme from './src/styles/shiki-theme.json' with { type: 'json' };
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Preserve code-fence titles on the highlighted pre element.
const fenceTitle = {
  name: 'fence-title',
  pre(node) {
    const raw = this.options.meta?.__raw;
    const match = typeof raw === 'string' && raw.match(/(?:^|\s)title=(?:"([^"]*)"|'([^']*)')/);
    if (match) node.properties['data-title'] = match[1] ?? match[2];
  },
};

export default defineConfig({
  site: 'https://jahattrinidad.com',
  output: 'static', // no adapter, no SSR
  trailingSlash: 'always', // D11 — explicit, not inferred
  build: { format: 'directory' },

  i18n: {
    locales: ['en', 'es', 'pt'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
    // fallback: MUST NOT be configured — see design.md §10
  },

  integrations: [
    mdx(),
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es', pt: 'pt-BR' } } }),
  ],

  markdown: { shikiConfig: { theme, transformers: [fenceTitle] } },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Epilogue',
      cssVariable: '--font-epilogue',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          { weight: 500, style: 'normal', src: ['./src/assets/fonts/epilogue/epilogue-500.woff2'] },
          { weight: 600, style: 'normal', src: ['./src/assets/fonts/epilogue/epilogue-600.woff2'] },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Hanken Grotesk',
      cssVariable: '--font-hanken',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/hankengrotesk/hankengrotesk-400.woff2'] },
          { weight: 500, style: 'normal', src: ['./src/assets/fonts/hankengrotesk/hankengrotesk-500.woff2'] },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/ibmplexmono/ibmplexmono-regular.woff2'] },
          { weight: 500, style: 'normal', src: ['./src/assets/fonts/ibmplexmono/ibmplexmono-medium.woff2'] },
          { weight: 400, style: 'italic', src: ['./src/assets/fonts/ibmplexmono/ibmplexmono-italic.woff2'] },
        ],
      },
    },
  ],
});
