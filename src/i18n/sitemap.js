import { SITE_URL, LOCALES, DEFAULT_LOCALE, localePath, matchRoute } from './config.js';

const HREFLANG = { fr: 'fr-FR', en: 'en' };

/**
 * `serialize` hook for @astrojs/sitemap: adds xhtml:link alternates
 * for every translated page (slugs differ per language, so the built-in
 * i18n option of the integration cannot be used).
 */
export function sitemapAlternates(item) {
  const url = new URL(item.url);
  const match = matchRoute(url.pathname);
  if (!match) return item;
  const links = LOCALES.map((locale) => ({
    lang: HREFLANG[locale],
    url: new URL(localePath(locale, match.key), SITE_URL).href,
  }));
  links.push({ lang: 'x-default', url: new URL(localePath(DEFAULT_LOCALE, match.key), SITE_URL).href });
  item.links = links;
  item.changefreq = match.key === 'menu' || match.key === 'events' ? 'weekly' : 'monthly';
  item.priority = match.key === 'home' ? 1 : match.key === 'legal' ? 0.2 : 0.8;
  return item;
}
