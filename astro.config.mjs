// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from './src/i18n/config.js';
import { sitemapAlternates } from './src/i18n/sitemap.js';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    // The whole stylesheet is small: inlining removes a render-blocking request.
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  // Le site en ligne utilise Amatic SC 400 en titrage et aktiv-grotesk 400 en
  // texte courant. Aktiv Grotesk est une police Adobe sous licence, qui ne peut
  // pas être auto-hébergée : Inter, néo-grotesque très proche, la remplace.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Amatic SC',
      cssVariable: '--font-amatic',
      fallbacks: ['cursive'],
      options: {
        variants: [{ src: ['./src/assets/fonts/amatic-sc-400.woff2'], weight: 400, style: 'normal' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/inter-400.woff2'], weight: 400, style: 'normal' }],
      },
    },
  ],
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: sitemapAlternates,
    }),
  ],
});
