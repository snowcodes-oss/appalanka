// Plain JS (no TS) because astro.config.mjs imports it at build time.
export const SITE_URL = 'https://www.appalanka.fr';
export const DEFAULT_LOCALE = 'fr';
export const LOCALES = ['fr', 'en'];

/**
 * Route registry: one key per page, one slug per locale.
 * The French (default) locale has no URL prefix; English lives under /en/.
 * Slugs are translated so each language gets meaningful, keyword-bearing URLs.
 */
export const ROUTES = {
  home: { fr: '', en: '' },
  menu: { fr: 'carte', en: 'menu' },
  cuisine: { fr: 'cuisine-sri-lankaise', en: 'sri-lankan-cuisine' },
  events: { fr: 'evenements', en: 'events' },
  carcassonne: { fr: 'restaurant-carcassonne', en: 'restaurant-carcassonne' },
  contact: { fr: 'contact', en: 'contact' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
};

/** Absolute path (with trailing slash) for a route key in a given locale. */
export function localePath(locale, key) {
  const slug = ROUTES[key][locale];
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

/** Find the route key + locale for an absolute path such as "/en/menu/". */
export function matchRoute(pathname) {
  const clean = pathname.replace(/\/+$/, '') + '/';
  for (const key of Object.keys(ROUTES)) {
    for (const locale of LOCALES) {
      if (localePath(locale, key) === clean) return { key, locale };
    }
  }
  return null;
}
