// Plain JS (no TS) because astro.config.mjs imports it at build time.

/** Domaine de production. */
const PRODUCTION_SITE = 'https://www.appalanka.fr';

// Un déploiement d'aperçu (GitHub Pages en « project page ») sert le site sous
// un sous-chemin : le workflow passe alors SITE_URL et BASE_PATH. Sans ces
// variables, on construit pour le domaine final, servi à la racine.
const env = typeof process !== 'undefined' && process.env ? process.env : {};

/** Origine du site déployé, sans barre oblique finale. */
export const SITE_URL = (env.SITE_URL || PRODUCTION_SITE).replace(/\/+$/, '');

/** Sous-chemin de déploiement, toujours de la forme `/` ou `/segment/`. */
export const BASE_PATH = (() => {
  const trimmed = (env.BASE_PATH || '').replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
})();

/** Vrai uniquement pour le build du domaine final : les aperçus restent hors index. */
export const IS_PRODUCTION = SITE_URL === PRODUCTION_SITE;

/** Préfixe un chemin interne (`/og-image.jpg`) avec le sous-chemin de déploiement. */
export function withBase(path) {
  return BASE_PATH + String(path).replace(/^\/+/, '');
}

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
  events: { fr: 'evenements', en: 'events' },
  carcassonne: { fr: 'restaurant-carcassonne', en: 'restaurant-carcassonne' },
  contact: { fr: 'contact', en: 'contact' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
};

/** Absolute path (with trailing slash) for a route key in a given locale. */
export function localePath(locale, key) {
  const slug = ROUTES[key][locale];
  const prefix = locale === DEFAULT_LOCALE ? '' : `${locale}/`;
  return withBase(`${prefix}${slug ? `${slug}/` : ''}`);
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
