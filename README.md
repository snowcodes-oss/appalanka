# Appa Lanka – site vitrine

Site vitrine du restaurant et bar à cocktails **Appa Lanka** (Conques-sur-Orbiel, près de Carcassonne) – [appalanka.fr](https://www.appalanka.fr).

- **Stack** : [Astro](https://astro.build) 7 (site 100 % statique, zéro JavaScript côté client hormis ~2,4 Ko pour le menu mobile), `@astrojs/sitemap`, `sharp` pour les images.
- **Langues** : français par défaut (`/`), anglais sous `/en/` (slugs traduits, balises `hreflang`, sitemap avec alternates).
- **Objectifs** : Lighthouse 100/100/100/100 (performance, accessibilité, bonnes pratiques, SEO), référencement local sur *Restaurant Carcassonne*, *Restaurant Conques-sur-Orbiel*, *Restaurant Sri Lanka*, *Appa Lanka*.

## Commandes

```bash
npm install        # dépendances
npm run dev        # serveur de développement (http://localhost:4321)
npm run build      # build de production dans dist/
npm run preview    # prévisualisation du build
npm run check      # vérification des types (astro check)
node scripts/brand-assets.mjs   # régénère favicon/icônes/image Open Graph depuis les SVG
```

## Où modifier le contenu

| Quoi | Fichier |
| --- | --- |
| Adresse, téléphones, e-mail, réseaux sociaux, **horaires** | `src/data/site.ts` |
| Carte (formule du midi, carte du soir, cocktails, boissons) et prix | `src/data/menu.ts` |
| Événements récurrents, **événements à venir**, soirées passées | `src/data/events.ts` |
| Textes des pages (FR + EN) | `src/components/pages/*.astro` (objet `copy`) |
| Libellés communs (navigation, pied de page, FAQ…) | `src/i18n/ui.ts` |
| URLs des pages par langue | `src/i18n/config.js` |
| Photos | `src/assets/images/` (JPEG ≈ 1600 px, Astro génère AVIF/WebP) |
| Logo / marque | `src/assets/logo.svg`, `src/assets/mark.svg`, `src/assets/logo-secondaire.png` (pied de page) |
| Couleurs, typographie, chevron | `src/styles/global.css` (bloc `:root`) |
| Mentions légales | `src/components/pages/LegalPage.astro` |

Les horaires sont saisis une seule fois dans `src/data/site.ts` : ils alimentent le tableau des horaires, la FAQ et les données structurées `openingHoursSpecification` (Google).

Pour publier un événement : ajouter une entrée dans `upcomingEvents` (`src/data/events.ts`). La page Événements l’affiche avec un balisage `Event` schema.org.

## SEO – ce qui est en place

- Titres et meta descriptions uniques par page et par langue, canonical, `hreflang` (fr-FR, en, x-default), Open Graph / Twitter cards, image OG 1200×630.
- Données structurées JSON-LD : `Restaurant` + `BarOrPub` (adresse, géolocalisation, horaires, cuisine, moyens de paiement, réseaux), `WebSite`, `BreadcrumbList`, `FAQPage` (accueil), `Menu`/`MenuItem` avec prix (page carte), `Event` (événements à venir).
- Sitemap XML avec alternates de langue (`/sitemap-index.xml`), `robots.txt`.
- Pages ciblées : accueil (Conques-sur-Orbiel / Carcassonne), `/cuisine-sri-lankaise/` (restaurant sri-lankais), `/restaurant-carcassonne/` (venir depuis Carcassonne), `/carte/`, `/evenements/`, `/contact/`.
- Redirections 301 des anciennes URLs Squarespace (`public/_redirects`).

### À faire après la mise en ligne (indispensable pour la visibilité locale)

1. **Google Business Profile** : revendiquer/mettre à jour la fiche « Appa Lanka » avec exactement les mêmes nom, adresse, téléphone et horaires que le site, ajouter le lien vers `https://www.appalanka.fr/`, la catégorie « Restaurant sri-lankais » + « Bar à cocktails », des photos, et répondre aux avis. C’est le premier levier pour « restaurant Carcassonne » / « restaurant Conques-sur-Orbiel ».
2. **Google Search Console** : ajouter la propriété `www.appalanka.fr`, soumettre `https://www.appalanka.fr/sitemap-index.xml`, demander l’indexation des pages principales.
3. Vérifier les données structurées avec le [test des résultats enrichis](https://search.google.com/test/rich-results).
4. Mettre à jour le lien du site sur Instagram, Facebook, TikTok, Tripadvisor, Petit Futé, l’office de tourisme Grand Carcassonne et la mairie (cohérence NAP).
5. Compléter les **mentions légales** (raison sociale, SIRET, hébergeur) dans `LegalPage.astro`.
6. Confirmer les **horaires** dans `src/data/site.ts` (valeurs initiales reprises de Facebook / Petit Futé).

## Déploiement

Le build produit un site statique dans `dist/`. Hébergement recommandé : **Cloudflare Pages** ou **Netlify** (gratuits, CDN, HTTPS automatique, support des fichiers `public/_headers` et `public/_redirects`).

- Commande de build : `npm run build` – dossier de sortie : `dist` – Node 22.
- Domaine : faire pointer `www.appalanka.fr` (canonique) et rediriger l’apex `appalanka.fr` vers `www`.
- `public/_headers` contient les en-têtes de sécurité (CSP, HSTS…). Le hash `script-src` correspond au petit script inline du menu mobile (`src/components/Header.astro`) : si vous modifiez ce script, recalculez le hash SHA-256 du contenu exact du script et mettez-le à jour.

## Design

Le design reprend celui du site en ligne (appalanka.fr). Les jetons ont été relevés sur le site existant et reportés dans `src/styles/global.css` :

| Élément | Valeur |
| --- | --- |
| Vert (fond, accent) | `#114232` — `hsl(160.41 59.04% 16.27%)` |
| Orange | `#ed7319` — `hsl(25.47 85.48% 51.37%)` |
| Doré | `#c09b65` — `hsl(35.6 41.94% 57.45%)` |
| Titres | Amatic SC 400 |
| Texte courant | interligne 1,8 |

Les motifs repris : bannière photo pleine largeur avec le titre en Amatic SC et le trait vert, en-tête transparent posé dessus (logo à gauche, navigation discrète et icônes sociales à droite), découpe en chevron (V pointant vers le bas, profondeur 15,5 %) entre la dernière section et le pied de page vert, liens d'action en Amatic SC souligné plutôt qu'en boutons pleins, et pied de page centré « Suivez-nous » avec le plan, le logo secondaire et les coordonnées en orange.

Le chevron est appliqué automatiquement à `main > :last-child` : le vert du document apparaît dans les deux triangles. La dernière section d'une page doit donc rester claire.

**Deux écarts assumés par rapport au site en ligne :**

1. **La police de texte.** Le site en ligne utilise *aktiv-grotesk*, une police Adobe sous licence Typekit qui ne peut pas être auto-hébergée. Elle est remplacée par **Inter**, néo-grotesque très proche, auto-hébergée et sous-ensemblée (18 Ko).
2. **Les contrastes.** L'orange de la charte sur fond blanc n'atteint pas le rapport exigé pour du texte courant : une variante assombrie (`--orange-ink`, `#b3520b`) est utilisée dans ces cas, l'orange d'origine restant sur les grands titres, le vert et les aplats. Les photos de bannière reçoivent un voile sombre pour garder le texte blanc lisible. Sans cela, le score d'accessibilité tombe sous 100.

Le site en ligne est par ailleurs presque vide de texte (la page d'accueil ne contient que trois mots). Le contenu rédigé pour le référencement a donc été conservé et habillé dans ce langage visuel, plutôt que supprimé.

## En-tête responsive

La barre de navigation bascule en menu burger sous **1088 px** (`68rem`), largeur en dessous de laquelle les cinq liens, le sélecteur de langue et le bouton « Réserver une table » ne tiennent plus sur une ligne. Le seuil se règle dans `src/styles/global.css` (`@media (max-width: 68rem)`) et dans le script de `src/components/Header.astro` (`matchMedia`) : **les deux valeurs doivent rester identiques**.

Le bandeau est collant (`position: sticky`), donc le bouton de réservation et le burger restent accessibles pendant le défilement. Sa hauteur réelle est publiée dans la variable CSS `--header-h` par un `ResizeObserver` ; elle sert à caler la barre de sections de la page carte et les ancres (`scroll-margin-top`).

Le panneau ouvert occupe tout l'écran sous le bandeau. Il verrouille le défilement de la page, rend le reste du document `inert` (ni focalisable ni lu par les lecteurs d'écran), déplace le focus sur le premier lien, se ferme avec Échap en rendant le focus au bouton, au clic sur un lien, et automatiquement si la fenêtre repasse au-dessus du seuil. Sans JavaScript, la navigation s'affiche en clair (voir le `<noscript>` de `Header.astro`).

> Le script du header est le seul JavaScript du site (~2,4 Ko). Il est inline et autorisé par un hash SHA-256 dans `public/_headers`. **Si vous le modifiez, régénérez ce hash**, sinon la navigation mobile sera bloquée par la Content Security Policy :
>
> ```bash
> npm run build && node -e "const s=require('fs').readFileSync('dist/index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];console.log('sha256-'+require('crypto').createHash('sha256').update(s).digest('base64'))"
> ```

## Qualité

`npm run check` puis `npm run build`. Le workflow GitHub Actions (`.github/workflows/ci.yml`) construit le site et exécute Lighthouse CI (`lighthouserc.json`) avec des seuils : accessibilité, bonnes pratiques et SEO = 100, performance ≥ 98.

Audit local :

```bash
npm run build && npm run preview -- --port 4330
npx lighthouse http://127.0.0.1:4330/ --view
```

## Licence

Contenu et images : © Appa Lanka. Code : usage privé du restaurant.
