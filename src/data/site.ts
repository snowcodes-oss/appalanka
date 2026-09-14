/**
 * Single source of truth for the restaurant's practical information
 * (NAP: name, address, phone). Update here; every page, the footer and the
 * structured data (JSON-LD) read from this file.
 */
export const site = {
  name: 'Appa Lanka',
  legalName: 'Appa Lanka – Restaurant et Bar à Cocktails',
  url: 'https://www.appalanka.fr',
  address: {
    street: '2 rue Jean Ferrat',
    postalCode: '11600',
    city: 'Conques-sur-Orbiel',
    region: 'Aude, Occitanie',
    country: 'FR',
  },
  geo: { latitude: 43.267114, longitude: 2.397322 },
  /** Main line (displayed) and its E.164 form for tel: links. */
  phone: { display: '09 88 58 43 38', intl: '+33 9 88 58 43 38', tel: '+33988584338' },
  mobile: { display: '07 60 10 26 26', intl: '+33 7 60 10 26 26', tel: '+33760102626' },
  email: 'appalanka@hotmail.com',
  social: {
    instagram: 'https://www.instagram.com/appa_lanka',
    facebook: 'https://www.facebook.com/people/Appa-Lanka/100093809480957/',
    tiktok: 'https://www.tiktok.com/@user9057613302513',
  },
  loyaltyUrl:
    'https://user.qoodos.fr/users/signupShop/default?iframe=004e24ad-7287-4759-9c7f-742fab6d2731',
  maps: {
    google: 'https://www.google.com/maps/search/?api=1&query=Appa+Lanka+2+rue+Jean+Ferrat+11600+Conques-sur-Orbiel',
    apple: 'https://maps.apple.com/?q=Appa+Lanka&ll=43.267114,2.397322',
    waze: 'https://waze.com/ul?ll=43.267114,2.397322&navigate=yes',
  },
  priceRange: '€€',
  /** ISO 8601 opening hours used for schema.org (regular services only). */
  openingHoursSpecification: [
    { days: ['Wednesday', 'Thursday', 'Friday'], opens: '12:00', closes: '14:30' },
    { days: ['Wednesday', 'Thursday', 'Saturday'], opens: '18:00', closes: '00:00' },
    { days: ['Friday'], opens: '18:00', closes: '02:00' },
  ],
} as const;

/**
 * Human-readable weekly schedule (Monday first).
 * `lunch` / `dinner`: null = closed, string = hours, { note } = on reservation.
 */
export type Slot = null | { hours: string } | { hours: string; onReservation: true };
export interface DaySchedule { day: number; lunch: Slot; dinner: Slot }

export const weekSchedule: DaySchedule[] = [
  { day: 1, lunch: null, dinner: null },
  { day: 2, lunch: null, dinner: { hours: '18:00 – 00:00', onReservation: true } },
  { day: 3, lunch: { hours: '12:00 – 14:30' }, dinner: { hours: '18:00 – 00:00' } },
  { day: 4, lunch: { hours: '12:00 – 14:30' }, dinner: { hours: '18:00 – 00:00' } },
  { day: 5, lunch: { hours: '12:00 – 14:30' }, dinner: { hours: '18:00 – 02:00' } },
  { day: 6, lunch: { hours: '12:00 – 14:30', onReservation: true }, dinner: { hours: '18:00 – 00:00' } },
  { day: 0, lunch: null, dinner: null },
];
