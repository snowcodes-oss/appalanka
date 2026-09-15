/**
 * The full menu, in both languages. Prices are in euros, service included.
 * Update this file when the menu changes: the menu page, the home page
 * teaser and the schema.org `Menu` structured data all read from it.
 */
export type Lang = 'fr' | 'en';
export type Localized = Record<Lang, string>;

export interface MenuItem {
  name: Localized;
  desc?: Localized;
  /** Single price (most items). */
  price?: number;
  /** Several prices, one per `columns` entry of the section (wines, beers...). */
  prices?: Array<number | null>;
  /** Alternative offer, e.g. an alcohol-free version of a cocktail. */
  alt?: { label: Localized; price: number };
  /** 'sl' = Sri Lankan speciality, 'veg' = vegetarian, 'clarified' = clarified cocktail. */
  tags?: Array<'sl' | 'veg' | 'clarified'>;
}

export interface MenuSection {
  id: string;
  title: Localized;
  intro?: Localized;
  /** Column headers when items carry `prices` (e.g. ['12 cl', '75 cl']). */
  columns?: Localized[];
  items: MenuItem[];
  footnote?: Localized;
}

export interface MenuGroup {
  id: string;
  title: Localized;
  subtitle: Localized;
  intro: Localized;
  sections: MenuSection[];
}

const L = (fr: string, en: string): Localized => ({ fr, en });

export const menuLastUpdated = L('septembre 2026', 'September 2026');

export const lunch: MenuGroup = {
  id: 'midi',
  title: L('Formule du midi', 'Lunch menu'),
  subtitle: L('18,90 € – plat + dessert', '€18.90 – main + dessert'),
  intro: L(
    'Du mercredi au vendredi midi (samedi midi sur réservation), une formule courte et gourmande qui change régulièrement, entre cuisine traditionnelle et saveurs sri-lankaises. Exemple de formule en ce moment :',
    'Wednesday to Friday lunchtime (Saturday lunch by reservation), a short, generous set menu that changes regularly, between traditional cooking and Sri Lankan flavours. Current example:',
  ),
  sections: [
    {
      id: 'midi-plats',
      title: L('Plats au choix', 'Choice of main'),
      items: [
        { name: L('Power Lanka saumon mariné', 'Power Lanka marinated salmon'), tags: ['sl'] },
        { name: L('Couscous boulettes', 'Couscous with meatballs') },
      ],
    },
    {
      id: 'midi-dessert',
      title: L('Dessert', 'Dessert'),
      items: [{ name: L('Sorbet fraise ou cassis maison', 'Homemade strawberry or blackcurrant sorbet') }],
    },
    {
      id: 'midi-kid',
      title: L('Menu kid – 12 €', 'Kids menu – €12'),
      items: [
        {
          name: L('Sirop à l’eau + nuggets de poulet ou poisson + glace surprise fait maison', 'Cordial + chicken or fish nuggets + homemade surprise ice cream'),
        },
      ],
    },
  ],
};

export const dinner: MenuGroup = {
  id: 'soir',
  title: L('La carte du soir', 'Evening à la carte'),
  subtitle: L('Du mardi au samedi soir', 'Tuesday to Saturday evenings'),
  intro: L(
    'À partager ou pas… Toutes nos entrées et nos plats peuvent se déguster seuls ou à plusieurs. Les plats marqués 🇱🇰 sont nos spécialités sri-lankaises.',
    'To share, or not… All our starters and mains can be enjoyed alone or with friends. Dishes marked 🇱🇰 are our Sri Lankan specialities.',
  ),
  sections: [
    {
      id: 'soir-partager',
      title: L('À partager ou pas…', 'To share, or not…'),
      items: [
        {
          name: L('Gyosas du Moment', 'Gyosas of the moment'),
          desc: L('Raviolis frits farçis de poulet ou de boeuf. Servis par 5.', 'Fried dumplings filled with chicken or beef. Served by 5.'),
          price: 8,
        },
        { name: L('Gyosas Végétariens', 'Vegetarian gyosas'), price: 7, tags: ['veg'] },
        {
          name: L('Bao Du Moment servie par 2', 'Bao of the Moment, served by 2'),
          desc: L('Petits Pains à la Vapeur farcis en fonction de l’envie du Chef.', 'Steamed buns filled according to the chef’s mood.'),
          price: 10,
        },
        { name: L('Frites de patate douce', 'Sweet potato fries'), price: 5, tags: ['veg'] },
        { name: L('Crevettes snackée', 'Seared prawns'), price: 8 },
      ],
    },
    {
      id: 'soir-plats',
      title: L('Les plats', 'Mains'),
      items: [
        {
          name: L('Burger du moment * BOA XL', 'Burger of the moment * BOA XL'),
          desc: L(
            'Pain Vapeur, filet de colin panné, rösti, chou violet mariné, pickles d’oignons rouges et crème cheddar fumé. * Accompagnement : frites de patate douce.',
            'Steamed bun, breaded hake fillet, rösti, marinated red cabbage, pickled red onions and smoked cheddar cream. * Served with sweet potato fries.',
          ),
          price: 19.9,
        },
        {
          name: L('Souris d’agneau confite', 'Slow-cooked lamb shank'),
          desc: L(
            'Souris d’agneau confite pendant trois heures, aux saveurs sri-lankaises.',
            'Lamb shank slow-cooked for three hours with Sri Lankan flavours.',
          ),
          price: 19.9,
          tags: ['sl'],
        },
        {
          name: L('Biryani de saumon', 'Salmon biryani'),
          desc: L(
            'Filet de saumon mijoté, mélangé avec du riz basmati, accompagnée d’une raïta : sauce au yaourt, concombre, carotte, jus de citron et cumin.',
            'Simmered salmon fillet mixed with basmati rice, served with a raita (yoghurt sauce, cucumber, carrot, lemon juice and cumin).',
          ),
          price: 21.9,
          tags: ['sl'],
        },
        {
          name: L('Curry de filet de poulet', 'Chicken fillet curry'),
          desc: L(
            'Filet de poulet mijoté avec des épices sri lankaise qui ne pique pas, servie avec des spagetti.',
            'Chicken fillet simmered with Sri Lankan spices (not hot), served with spaghetti.',
          ),
          price: 19.9,
          tags: ['sl'],
        },
        {
          name: L('Salade Cesar revisité', 'Caesar salad, revisited'),
          desc: L('Certains secrets se savourent… et se redemandent.', 'Some secrets are meant to be savoured… and ordered again.'),
          price: 17.9,
          tags: ['sl'],
        },
      ],
    },
    {
      id: 'soir-kid',
      title: L('Menu kid – 12 €', 'Kids menu – €12'),
      items: [
        {
          name: L('Sirop à l’eau au Choix, nuggets + frites, boule de glace faite Maison', 'Cordial of your choice, nuggets + fries, scoop of homemade ice cream'),
        },
      ],
    },
    {
      id: 'soir-desserts',
      title: L('Les desserts', 'Desserts'),
      items: [
        {
          name: L('Moelleux au chocolat coulant ou bien cuit', 'Chocolate fondant, molten or well done'),
          desc: L('Accompagné d’un coulis framboise.', 'Served with a raspberry coulis.'),
          price: 9,
        },
        { name: L('Riz au Lait Srilankais', 'Sri Lankan rice pudding'), price: 8, tags: ['sl'] },
        { name: L('Lassi Mangue', 'Mango lassi'), price: 7, tags: ['sl'] },
        { name: L('Hoppers du chef', 'Chef’s hoppers'), price: 9, tags: ['sl'] },
        {
          name: L('Kulfi', 'Kulfi'),
          desc: L('Glace vanille et cardamone, nougatine, coulis de mangue et coco rapée.', 'Vanilla and cardamom ice cream, nougatine, mango coulis and grated coconut.'),
          price: 9,
          tags: ['sl'],
        },
      ],
    },
  ],
};

export const cocktails: MenuGroup = {
  id: 'cocktails',
  title: L('Cocktails signatures', 'Signature cocktails'),
  subtitle: L('Uniquement le soir', 'Evenings only'),
  intro: L(
    'Des créations uniques imaginées pour Appa Lanka par notre bartender. Plusieurs cocktails existent en version sans alcool.',
    'Unique creations designed for Appa Lanka by our bartender. Several cocktails come in an alcohol-free version.',
  ),
  sections: [
    {
      id: 'cocktails-signatures',
      title: L('Nos créations', 'Our creations'),
      items: [
        {
          name: L('Jardin des Éclats', 'Jardin des Éclats'),
          desc: L('Mezcal, jus d’ananas, verveine, sirop d’agave, fleur d’oranger, ginger ale, citron jaune.', 'Mezcal, pineapple juice, verbena, agave syrup, orange blossom, ginger ale, lemon.'),
          price: 13,
          alt: { label: L('Version sans alcool', 'Alcohol-free version'), price: 8 },
        },
        {
          name: L('Srilanka Paloma', 'Srilanka Paloma'),
          desc: L('Tequila infusée curry-coriandre, sirop de rose, jus de fraise, jus de citron vert, limonade.', 'Curry-and-coriander-infused tequila, rose syrup, strawberry juice, lime juice, lemonade.'),
          price: 12,
          alt: { label: L('Version sans alcool', 'Alcohol-free version'), price: 8 },
          tags: ['sl'],
        },
        {
          name: L('Histoire d’Australie', 'Histoire d’Australie'),
          desc: L('Vodka, liqueur de litchi, sirop de fleur de sureau, jus de citron vert, jus de litchi, energy drink.', 'Vodka, lychee liqueur, elderflower syrup, lime juice, lychee juice, energy drink.'),
          price: 12,
          alt: { label: L('Version sans alcool', 'Alcohol-free version'), price: 8 },
        },
        {
          name: L('Penicillin', 'Penicillin'),
          desc: L('Whisky écossais 12 ans, whisky tourbé 12 ans, liqueur de gingembre, jus de citron jaune, sirop de miel.', '12-year-old Scotch whisky, 12-year-old peated whisky, ginger liqueur, lemon juice, honey syrup.'),
          price: 14,
        },
        {
          name: L('Colada Silk', 'Colada Silk'),
          desc: L('Cocktail clarifié* : rhum épicé, liqueur de passion, sirop de pandan, eau de coco, citron jaune.', 'Clarified cocktail*: spiced rum, passion fruit liqueur, pandan syrup, coconut water, lemon.'),
          price: 13,
          tags: ['clarified'],
        },
        {
          name: L('Pomme de Feu', 'Pomme de Feu'),
          desc: L('Cocktail clarifié* : secret du bartender, jus de citron jaune, sirop de vanille, Martini Bianco, Suze, jus de pomme, jus de poire.', 'Clarified cocktail*: bartender’s secret, lemon juice, vanilla syrup, Martini Bianco, Suze, apple juice, pear juice.'),
          price: 13,
          tags: ['clarified'],
        },
        {
          name: L('Verre d’Eau', 'Verre d’Eau'),
          desc: L('Cocktail clarifié* : gin, jus de citron jaune, sirop de pastèque, Cointreau, feuille de basilic, jus de pamplemousse.', 'Clarified cocktail*: gin, lemon juice, watermelon syrup, Cointreau, basil leaf, grapefruit juice.'),
          price: 13,
          tags: ['clarified'],
        },
        {
          name: L('Spiced Ceylon Highball', 'Spiced Ceylon Highball'),
          desc: L('Cachaça, cordial citron vert & cardamome, sirop de poivre noir, ginger beer.', 'Cachaça, lime & cardamom cordial, black pepper syrup, ginger beer.'),
          price: 12,
          tags: ['sl'],
        },
      ],
      footnote: L(
        '* Un cocktail clarifié est travaillé pour être plus doux et plus agréable à boire : grâce à une technique de filtration, on enlève ce qui rend l’alcool plus dur tout en gardant tous les arômes. Résultat : un cocktail clair, équilibré, très facile à boire, avec une sensation soyeuse en bouche.',
        '* A clarified cocktail is crafted to be smoother and more pleasant to drink: a filtration technique removes what makes the alcohol harsh while keeping all the aromas. The result: a clear, balanced, very easy-drinking cocktail with a silky mouthfeel.',
      ),
    },
  ],
};

export const drinks: MenuGroup = {
  id: 'boissons',
  title: L('Carte des boissons', 'Drinks list'),
  subtitle: L('Softs, vins, bières, spiritueux', 'Soft drinks, wines, beers, spirits'),
  intro: L('Prix service compris.', 'Prices include service.'),
  sections: [
    {
      id: 'softs',
      title: L('Les softs', 'Soft drinks'),
      items: [
        { name: L('Eau plate 75 cl', 'Still water 75 cl'), price: 4.5 },
        { name: L('Eau gazeuse 75 cl', 'Sparkling water 75 cl'), price: 4.5 },
        { name: L('Coca-Cola, Coca Zéro, Cherry Coke 33 cl', 'Coca-Cola, Coke Zero, Cherry Coke 33 cl'), price: 3.9 },
        { name: L('Perrier 33 cl', 'Perrier 33 cl'), price: 3.9 },
        { name: L('Fuze Tea pêche ou citron vert', 'Fuze Tea peach or lime'), price: 3.9 },
        { name: L('Limonade 33 cl', 'Lemonade 33 cl'), price: 3.9 },
        { name: L('Oasis Tropical 25 cl', 'Oasis Tropical 25 cl'), price: 3.9 },
        { name: L('Schweppes Tonic 25 cl', 'Schweppes Tonic 25 cl'), price: 3.9 },
        { name: L('Jus de fruit 25 cl', 'Fruit juice 25 cl'), price: 3.9 },
        { name: L('Diabolo 25 cl', 'Diabolo 25 cl'), price: 3.9 },
        { name: L('Sirop à l’eau', 'Cordial'), price: 2.5 },
        { name: L('Thé noir de Ceylan', 'Ceylon black tea'), price: 3.5, tags: ['sl'] },
      ],
    },
    {
      id: 'biere-pression',
      title: L('Bières pression', 'Draught beers'),
      columns: [L('25 cl', '25 cl'), L('50 cl', '50 cl')],
      items: [
        { name: L('Kronenbourg', 'Kronenbourg'), prices: [3.8, 7] },
        { name: L('Grimbergen blanche', 'Grimbergen wheat beer'), prices: [4.5, 8.5] },
        { name: L('Grimbergen blonde', 'Grimbergen blonde'), prices: [4.5, 8.5] },
      ],
    },
  ],
};

export const menuGroups = [lunch, dinner, cocktails, drinks];

export const highlights = dinner.sections
  .flatMap((section) => section.items)
  .filter((item) => item.price)
  .slice(0, 4);

export const formatPrice = (price: number, lang: Lang) =>
  new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
