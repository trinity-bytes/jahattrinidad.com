import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jahattrinidad.com',
  output: 'static', // no adapter, no SSR
  trailingSlash: 'always', // D11 — explicit, not inferred
  build: { format: 'directory' },

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
    // fallback: MUST NOT be configured — see design.md §10
  },

  integrations: [
    mdx(),
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-ES' } } }),
  ],

  fonts: [], // provider selection is a visual-design decision, deferred out of scope
});
