import type { APIRoute } from 'astro';
import { SITE_URL, IS_PRODUCTION, withBase } from '../i18n/config.js';

/**
 * Généré plutôt que statique : l'URL du sitemap dépend du domaine et du
 * sous-chemin de déploiement, et un aperçu (GitHub Pages) doit rester
 * entièrement hors index pour ne pas dupliquer le site final.
 */
export const GET: APIRoute = () => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), SITE_URL).href;
  const body = IS_PRODUCTION
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
