// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, BASE_PATH, LOCALES, DEFAULT_LOCALE } from './src/i18n/config.js';
import { sitemapAlternates } from './src/i18n/sitemap.js';

export default defineConfig({
  site: SITE_URL,
  // '/' pour le domaine final ; '/<repo>/' quand GitHub Pages sert le site
  // sous un sous-chemin (cf. SITE_URL / BASE_PATH dans src/i18n/config.js).
  base: BASE_PATH,
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
  // Titrage : Fraunces, serif chaleureux à empattements francs.
  // Texte courant : Inter. Le lettrage dessiné de la marque reste porté par
  // le logo, qui est un SVG.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/fraunces-700.woff2'], weight: 700, style: 'normal' }],
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
