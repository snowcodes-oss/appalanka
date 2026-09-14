import type { Lang, Localized } from './menu';

const L = (fr: string, en: string): Localized => ({ fr, en });

/** Recurring formats shown on the events page. */
export const recurringEvents = [
  {
    id: 'concert',
    icon: 'music',
    title: L('Concerts live', 'Live concerts'),
    text: L(
      'Des groupes et artistes de la région en live dans la salle, pour dîner en musique.',
      'Local bands and artists playing live in the dining room, for dinner with music.',
    ),
  },
  {
    id: 'karaoke',
    icon: 'mic',
    title: L('Soirées karaoké', 'Karaoke nights'),
    text: L(
      'The Voice, c’est vous ! Réservation conseillée, ces soirées affichent vite complet.',
      'The Voice is you! Booking recommended, these nights fill up fast.',
    ),
  },
  {
    id: 'blindtest',
    icon: 'question',
    title: L('Blind tests & soirées dansantes', 'Blind tests & dance nights'),
    text: L(
      'Quiz musical entre amis ou soirée DJ (latino, afro, funk, old school…) pour faire vibrer la piste.',
      'Music quiz with friends or a DJ night (latino, afro, funk, old school…) to get the dance floor moving.',
    ),
  },
  {
    id: 'match',
    icon: 'tv',
    title: L('Diffusion de matchs', 'Live sports'),
    text: L(
      'Rugby, football… les grands matchs sont diffusés au bar autour d’une bière ou d’un cocktail.',
      'Rugby, football… the big games are shown at the bar over a beer or a cocktail.',
    ),
  },
] as const;

/**
 * Upcoming events. Add an entry to publish it (with schema.org `Event` markup).
 * Dates are ISO 8601 with the Paris offset, e.g. '2026-12-31T20:00:00+01:00'.
 */
export interface UpcomingEvent {
  slug: string;
  title: Localized;
  description: Localized;
  start: string;
  end?: string;
  price?: number;
}

export const upcomingEvents: UpcomingEvent[] = [];

/** Past highlights, for social proof on the events page. */
export const pastEvents = [
  {
    title: L('Réveillon du Nouvel An', 'New Year’s Eve'),
    text: L('Menu gastronomique en plusieurs services, cocktail création, musique jusqu’au bout de la nuit.', 'Multi-course gala menu, a signature cocktail and music until the small hours.'),
  },
  {
    title: L('Concert live du groupe Evidence', 'Live concert with the band Evidence'),
    text: L('Une soirée musicale en direct, plats et cocktails à la carte.', 'A live music evening with à la carte dishes and cocktails.'),
  },
  {
    title: L('DJ party avec 11samuse', 'DJ party with 11samuse'),
    text: L('Latino, afro, funk, old school… la première soirée DJ d’Appa Lanka.', 'Latino, afro, funk, old school… Appa Lanka’s first DJ night.'),
  },
  {
    title: L('Soirées karaoké', 'Karaoke nights'),
    text: L('Régulièrement au programme, animées par David de 11samuse.', 'Regularly on the programme, hosted by David from 11samuse.'),
  },
];

export function t(l: Localized, lang: Lang): string {
  return l[lang];
}
