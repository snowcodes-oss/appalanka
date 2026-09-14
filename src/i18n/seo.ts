import type { Lang } from '../data/menu';
import { site } from '../data/site';
import { menuGroups, type MenuGroup } from '../data/menu';
import { SITE_URL, LOCALES, DEFAULT_LOCALE, localePath, type ROUTES } from './config.js';

export type RouteKey = keyof typeof ROUTES;

export const HREFLANG: Record<Lang, string> = { fr: 'fr-FR', en: 'en' };
export const OG_LOCALE: Record<Lang, string> = { fr: 'fr_FR', en: 'en_GB' };

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

export function alternates(routeKey: RouteKey) {
  const list = (LOCALES as Lang[]).map((locale) => ({
    hreflang: HREFLANG[locale],
    href: absoluteUrl(localePath(locale, routeKey)),
  }));
  list.push({ hreflang: 'x-default', href: absoluteUrl(localePath(DEFAULT_LOCALE, routeKey)) });
  return list;
}

const descriptions: Record<Lang, string> = {
  fr: 'Restaurant et bar à cocktails à Conques-sur-Orbiel, à 10 minutes de Carcassonne. Cuisine traditionnelle revisitée et spécialités sri-lankaises, cocktails signatures, concerts, karaoké et soirées.',
  en: 'Restaurant and cocktail bar in Conques-sur-Orbiel, 10 minutes from Carcassonne. Revisited traditional cooking and Sri Lankan specialities, signature cocktails, live music, karaoke and events.',
};

const amenities: Record<Lang, string[]> = {
  fr: ['Terrasse', 'Accès PMR', 'Wi-Fi gratuit', 'Parking gratuit', 'Animaux acceptés', 'Chaises hautes', 'Privatisation possible'],
  en: ['Terrace', 'Wheelchair accessible', 'Free Wi-Fi', 'Free parking', 'Pets welcome', 'High chairs', 'Private hire available'],
};

export function restaurantJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'BarOrPub'],
    '@id': `${SITE_URL}/#restaurant`,
    name: site.name,
    alternateName: site.legalName,
    description: descriptions[lang],
    url: absoluteUrl(localePath(lang, 'home')),
    image: [absoluteUrl('/og-image.jpg')],
    logo: absoluteUrl('/icon-512.png'),
    telephone: site.phone.tel,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: 'Occitanie',
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    hasMap: site.maps.google,
    servesCuisine: ['Sri Lankan', 'French', 'Fusion', 'Cocktails'],
    priceRange: site.priceRange,
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Ticket Restaurant',
    acceptsReservations: 'True',
    openingHoursSpecification: site.openingHoursSpecification.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days.map((d) => `https://schema.org/${d}`),
      opens: s.opens,
      closes: s.closes,
    })),
    hasMenu: absoluteUrl(localePath(lang, 'menu')),
    sameAs: Object.values(site.social),
    areaServed: [
      { '@type': 'City', name: 'Conques-sur-Orbiel' },
      { '@type': 'City', name: 'Carcassonne' },
    ],
    amenityFeature: amenities[lang].map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
  };
}

export function websiteJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL + '/',
    name: site.name,
    inLanguage: HREFLANG[lang],
    publisher: { '@id': `${SITE_URL}/#restaurant` },
  };
}

export interface Crumb {
  label: string;
  href?: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

function sectionJsonLd(group: MenuGroup, lang: Lang) {
  return group.sections.map((section) => ({
    '@type': 'MenuSection',
    name: `${group.title[lang]} – ${section.title[lang]}`,
    hasMenuItem: section.items
      .filter((item) => item.price !== undefined)
      .map((item) => ({
        '@type': 'MenuItem',
        name: item.name[lang],
        ...(item.desc ? { description: item.desc[lang] } : {}),
        offers: { '@type': 'Offer', price: item.price!.toFixed(2), priceCurrency: 'EUR' },
      })),
  }));
}

export function menuJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${absoluteUrl(localePath(lang, 'menu'))}#menu`,
    name: lang === 'fr' ? 'La carte d’Appa Lanka' : 'Appa Lanka menu',
    inLanguage: HREFLANG[lang],
    url: absoluteUrl(localePath(lang, 'menu')),
    hasMenuSection: menuGroups.flatMap((g) => sectionJsonLd(g, lang)),
  };
}
