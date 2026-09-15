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
| Couleurs et typographie | `src/styles/global.css` (bloc `:root`) |
| Bandeau d'annonce, bandeau défilant | `src/i18n/ui.ts`, `src/components/pages/HomePage.astro` |
| Mentions légales | `src/components/pages/LegalPage.astro` |

Les horaires sont saisis une seule fois dans `src/data/site.ts` : ils alimentent le tableau des horaires, la FAQ et les données structurées `openingHoursSpecification` (Google).

Pour publier un événement : ajouter une entrée dans `upcomingEvents` (`src/data/events.ts`). La page Événements l’affiche avec un balisage `Event` schema.org.

## SEO – ce qui est en place

- Titres et meta descriptions uniques par page et par langue, canonical, `hreflang` (fr-FR, en, x-default), Open Graph / Twitter cards, image OG 1200×630.
- Données structurées JSON-LD : `Restaurant` + `BarOrPub` (adresse, géolocalisation, horaires, cuisine, moyens de paiement, réseaux), `WebSite`, `BreadcrumbList`, `FAQPage` (accueil), `Menu`/`MenuItem` avec prix (page carte), `Event` (événements à venir).
- Sitemap XML avec alternates de langue (`/sitemap-index.xml`), `robots.txt`.
- Pages ciblées : accueil (Conques-sur-Orbiel / Carcassonne), `/restaurant-carcassonne/` (venir depuis Carcassonne), `/carte/`, `/evenements/`, `/contact/`.
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

L'habillage suit une référence fournie par le client : navigation en pilule flottante posée sur la bannière, grande typographie serif, aplats de couleurs franches, bandeau défilant, grille de plats à pastilles de filtre, pied de page en colonnes avec le lettrage de la maison en très grand.

Les couleurs de la marque sont celles du site en ligne et des cartes imprimées :

| Rôle | Valeur |
| --- | --- |
| Fond crème | `#fbf1e1` |
| Vert (marque) | `#114232` |
| Orange (marque) | `#ed7319` |
| Bordeaux (bloc d'accent) | `#6b1620` |
| Curcuma (bandeau défilant) | `#f2b705` |
| Doré (marque) | `#c09b65` |

Typographie : **Fraunces** 700 en titrage (serif chaleureux à empattements francs) et **Inter** 400 en texte courant, toutes deux auto-hébergées et sous-ensemblées (17 Ko chacune). Le lettrage dessiné d'origine reste porté par le logo, qui est un SVG.

Les jetons sont regroupés dans le bloc `:root` de `src/styles/global.css`. Les composants du système : `.nav-pill`, `.hero`, `.statement` (phrase manifeste avec vignettes rondes en ligne), `.marquee`, `.chips`, `.tiles`, `.quotes`, `.section--maroon`, `.footer-wordmark`.

**Écarts assumés par rapport à la référence :**

1. **Texte sombre sur l'orange.** La référence pose du texte clair sur l'orange ; ce couple n'atteint pas le rapport de contraste exigé. Les boutons orange utilisent donc un texte très sombre (`--on-orange`). L'orange en petit texte sur fond clair passe par une variante assombrie (`--orange-ink`).
2. **Pastilles de filtre sans JavaScript.** Dans la référence elles filtrent la grille ; ici ce sont des ancres vers les sections de la carte. Même apparence, zéro JavaScript, et chaque section reste indexable.
3. **Pas de section ludique à glisser-déposer.** Elle supposerait du JavaScript d'interaction et n'apporte rien au référencement.

Le bandeau défilant s'arrête au survol et ne s'anime pas si le système demande de réduire les animations.

## En-tête responsive

La barre de navigation bascule en menu burger sous **1088 px** (`68rem`), largeur en dessous de laquelle les cinq liens, le sélecteur de langue et le bouton « Réserver une table » ne tiennent plus sur une ligne. Le seuil se règle dans `src/styles/global.css` (`@media (max-width: 68rem)`) et dans le script de `src/components/Header.astro` (`matchMedia`) : **les deux valeurs doivent rester identiques**.

Le bandeau est collant (`position: sticky`), donc le bouton de réservation et le burger restent accessibles pendant le défilement. Sa hauteur réelle est publiée dans la variable CSS `--header-h` par un `ResizeObserver` ; elle sert à caler la barre de sections de la page carte et les ancres (`scroll-margin-top`). Le même observateur publie `--announce-h`, la hauteur du bandeau d'annonce, dont la bannière d'accueil (`.hero--full`) se sert pour occuper exactement le reste de l'écran.

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
