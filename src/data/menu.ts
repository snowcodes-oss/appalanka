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
          name: L('Bœuf confit', 'Slow-cooked beef'),
          desc: L(
            'Piéce de bœuf saisie puis cuit à basse température 30 h, servie avec un écrasé de pomme de terre et jus maison.',
            'Beef seared then cooked at low temperature for 30 hours, served with crushed potatoes and a homemade jus.',
          ),
          price: 19.9,
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
        { name: L('Orangina', 'Orangina'), price: 3.9 },
        {
          name: L('Jus de fruits au choix', 'Fruit juice of your choice'),
          desc: L('Orange, pomme, fraise, mangue, tomate, ananas, fruit du dragon.', 'Orange, apple, strawberry, mango, tomato, pineapple, dragon fruit.'),
          price: 3.5,
        },
        {
          name: L('Sirop à l’eau', 'Cordial'),
          desc: L('Grenadine, pêche, menthe, fraise, kiwi, gingembre, violette, mangue, citron, framboise, pamplemousse, vanille.', 'Grenadine, peach, mint, strawberry, kiwi, ginger, violet, mango, lemon, raspberry, grapefruit, vanilla.'),
          price: 2,
        },
        { name: L('Diabolo 25 cl', 'Diabolo 25 cl'), price: 2.5 },
        { name: L('Tonic', 'Tonic'), price: 3.5 },
        { name: L('Ginger ale', 'Ginger ale'), price: 3.5 },
        { name: L('Supplément sirop', 'Extra syrup'), price: 0.7 },
      ],
    },
    {
      id: 'aperitifs',
      title: L('Apéritifs', 'Aperitifs'),
      items: [
        { name: L('Kir pêche, mûre, cassis ou violette', 'Kir – peach, blackberry, blackcurrant or violet'), price: 4.5 },
        { name: L('Kir pétillant', 'Sparkling kir'), price: 7 },
        { name: L('Pastis Cabanel', 'Cabanel pastis'), price: 5 },
        { name: L('Martini rouge ou blanc', 'Martini red or white'), price: 5 },
        { name: L('Porto rouge', 'Red port'), price: 5 },
      ],
    },
    {
      id: 'chaudes',
      title: L('Boissons chaudes', 'Hot drinks'),
      items: [
        { name: L('Espresso, ristretto', 'Espresso, ristretto'), price: 2.2 },
        { name: L('Noisette', 'Macchiato'), price: 2.5 },
        { name: L('Café allongé', 'Long coffee'), price: 2.2 },
        { name: L('Café crème', 'Café crème'), price: 3.5 },
        { name: L('Cappuccino', 'Cappuccino'), price: 3.5 },
        { name: L('Moka', 'Mocha'), price: 3.5 },
        { name: L('Ice coffee', 'Iced coffee'), price: 2.5 },
        { name: L('Ice moka', 'Iced mocha'), price: 3.7 },
        { name: L('Chocolat chaud', 'Hot chocolate'), price: 3 },
        {
          name: L('Thé', 'Tea'),
          desc: L('Menthe, jasmin, citron, thé noir de Ceylan, camomille, rooibos vanille, gingembre-citronnelle, Earl Grey Supreme.', 'Mint, jasmine, lemon, Ceylon black tea, chamomile, vanilla rooibos, ginger-lemongrass, Earl Grey Supreme.'),
          price: 3.5,
        },
      ],
    },
    {
      id: 'vins-verre',
      title: L('Les vins au verre – Les Nouveaux Occitans', 'Wines by the glass – Les Nouveaux Occitans'),
      intro: L('IGP Terres du Midi – Hautes Corbières, blanc, rouge ou rosé.', 'IGP Terres du Midi – Hautes Corbières, white, red or rosé.'),
      columns: [L('12 cl', '12 cl'), L('25 cl', '25 cl'), L('50 cl', '50 cl')],
      items: [{ name: L('Blanc, rouge ou rosé', 'White, red or rosé'), prices: [3.5, 6, 9] }],
    },
    {
      id: 'vins-blancs',
      title: L('Vins blancs', 'White wines'),
      columns: [L('12 cl', '12 cl'), L('75 cl', '75 cl')],
      items: [
        { name: L('Les Nouveaux Occitans « Celestia »', 'Les Nouveaux Occitans “Celestia”'), desc: L('Vin de France', 'Vin de France'), prices: [4, 18.9] },
        { name: L('Uby Tortue', 'Uby Tortue'), desc: L('IGP Côtes de Gascogne', 'IGP Côtes de Gascogne'), prices: [5.5, 27.9] },
        { name: L('La Baie du Soleil – Chardonnay', 'La Baie du Soleil – Chardonnay'), desc: L('IGP Pays d’Oc', 'IGP Pays d’Oc'), prices: [4, 23.9] },
        { name: L('Domaine La Mijane – Gewurztraminer', 'Domaine La Mijane – Gewurztraminer'), desc: L('IGP Cité de Carcassonne', 'IGP Cité de Carcassonne'), prices: [6, 28.9] },
      ],
    },
    {
      id: 'vins-rouges',
      title: L('Vins rouges', 'Red wines'),
      columns: [L('12 cl', '12 cl'), L('75 cl', '75 cl')],
      items: [
        { name: L('Les Nouveaux Occitans « Nebulia »', 'Les Nouveaux Occitans “Nebulia”'), desc: L('Vin de France', 'Vin de France'), prices: [4, 18.9] },
        { name: L('Les Nouveaux Occitans « Aria » bio', 'Les Nouveaux Occitans “Aria” organic'), desc: L('AOP Languedoc – Corbières', 'AOP Languedoc – Corbières'), prices: [5, 21.9] },
        { name: L('Mas Janeil 2022', 'Mas Janeil 2022'), desc: L('IGP Côtes Catalanes', 'IGP Côtes Catalanes'), prices: [6.9, 34.9] },
        { name: L('Domaine La Mijane « Fluvius » 2015', 'Domaine La Mijane “Fluvius” 2015'), desc: L('AOP Cabardès rouge', 'AOP Cabardès red'), prices: [null, 44.9] },
      ],
    },
    {
      id: 'vins-roses',
      title: L('Vins rosés', 'Rosé wines'),
      columns: [L('12 cl', '12 cl'), L('75 cl', '75 cl')],
      items: [{ name: L('La Baie du Soleil – Rosé', 'La Baie du Soleil – Rosé'), desc: L('IGP Pays d’Oc', 'IGP Pays d’Oc'), prices: [4, 23.9] }],
    },
    {
      id: 'bulles',
      title: L('Les bulles', 'Sparkling'),
      columns: [L('10 cl', '10 cl'), L('75 cl', '75 cl')],
      items: [
        { name: L('Blanquette de Limoux – Antech, brut', 'Blanquette de Limoux – Antech, brut'), prices: [5, 19.9] },
        { name: L('Moscato d’Asti', 'Moscato d’Asti'), desc: L('Vin italien pétillant', 'Italian sparkling wine'), prices: [null, 25.9] },
        { name: L('Champagne Mercier brut', 'Champagne Mercier brut'), prices: [null, 59] },
        { name: L('Moët & Chandon Ice', 'Moët & Chandon Ice'), prices: [null, 100] },
      ],
    },
    {
      id: 'bieres-pression',
      title: L('Bières pression', 'Draught beers'),
      columns: [L('15 cl', '15 cl'), L('25 cl', '25 cl'), L('50 cl', '50 cl')],
      items: [
        { name: L('Galopin', 'Galopin'), prices: [2.5, null, null] },
        { name: L('Bud', 'Bud'), prices: [null, 4, 7] },
        { name: L('Bière du moment 33 cl', 'Beer of the moment 33 cl'), prices: [null, 7, 9] },
        { name: L('Monaco', 'Monaco'), prices: [null, 4.5, 8] },
        { name: L('Panaché', 'Shandy'), prices: [null, 4, 7] },
      ],
    },
    {
      id: 'bieres-bouteille',
      title: L('Bières bouteille (33 cl)', 'Bottled beers (33 cl)'),
      items: [
        { name: L('Peroni sans alcool', 'Peroni alcohol-free'), price: 6 },
        { name: L('Corona Sunset', 'Corona Sunset'), price: 6 },
        { name: L('La Chouffe', 'La Chouffe'), price: 7 },
        { name: L('Desperados', 'Desperados'), price: 6 },
        { name: L('Supplément sirop', 'Extra syrup'), price: 0.5 },
      ],
    },
    {
      id: 'bourbon-whisky',
      title: L('Bourbons & whiskies (4 cl)', 'Bourbons & whiskies (4 cl)'),
      items: [
        { name: L('Maker’s Mark', 'Maker’s Mark'), price: 7 },
        { name: L('Woodford Reserve', 'Woodford Reserve'), price: 8 },
        { name: L('Jack Daniel’s', 'Jack Daniel’s'), price: 6 },
        { name: L('Jack Daniel’s pomme, Fire ou miel', 'Jack Daniel’s apple, Fire or honey'), price: 8 },
        { name: L('Bullet 95 Rye', 'Bullet 95 Rye'), price: 10 },
        { name: L('Laphroaig 10 ans', 'Laphroaig 10 years'), price: 10 },
        { name: L('Cardhu 12 ans', 'Cardhu 12 years'), price: 8 },
        { name: L('Johnnie Walker Blue Label', 'Johnnie Walker Blue Label'), price: 32 },
      ],
    },
    {
      id: 'rhums',
      title: L('Rhums (4 cl)', 'Rums (4 cl)'),
      items: [
        { name: L('Sailor Jerry', 'Sailor Jerry'), price: 8 },
        { name: L('Don Papa', 'Don Papa'), price: 10 },
        { name: L('Bumbu Original', 'Bumbu Original'), price: 11 },
        { name: L('Bumbu XO', 'Bumbu XO'), price: 13 },
        { name: L('Bumbu Cream', 'Bumbu Cream'), price: 10 },
        { name: L('Eminente 7 ans Gran Reserva', 'Eminente 7 years Gran Reserva'), price: 13 },
        { name: L('Eminente 10 ans Gran Reserva', 'Eminente 10 years Gran Reserva'), price: 16 },
        { name: L('Plantation Pineapple', 'Plantation Pineapple'), price: 12 },
      ],
    },
    {
      id: 'gins-vodka',
      title: L('Gins & vodka (4 cl)', 'Gins & vodka (4 cl)'),
      items: [
        { name: L('Beefeater', 'Beefeater'), price: 7 },
        { name: L('Bohème – Carcassonne', 'Bohème – Carcassonne'), price: 9 },
        { name: L('Tanqueray', 'Tanqueray'), price: 10 },
        { name: L('Tanqueray Ten', 'Tanqueray Ten'), price: 14 },
        { name: L('Colombo – Sri Lanka', 'Colombo – Sri Lanka'), price: 10, tags: ['sl'] },
        { name: L('L’Acrobate – France', 'L’Acrobate – France'), price: 9 },
        { name: L('Hendrick’s', 'Hendrick’s'), price: 11 },
        { name: L('Vodka artisanale', 'Craft vodka'), price: 8 },
      ],
    },
    {
      id: 'digestifs',
      title: L('Digestifs (4 cl)', 'Digestifs (4 cl)'),
      items: [
        { name: L('Liqueur poire-cognac Noces Royales', 'Noces Royales pear & cognac liqueur'), price: 8 },
        { name: L('Amaretto', 'Amaretto'), price: 6 },
        {
          name: L('Cabanel', 'Cabanel'),
          desc: L('Menthe, citron, orange, mandarine.', 'Mint, lemon, orange, mandarin.'),
          price: 6,
        },
        { name: L('Baileys', 'Baileys'), price: 6 },
        { name: L('Armaniac 10 ans', 'Armaniac 10 years'), price: 8 },
        { name: L('Cognac Hennessy VS', 'Cognac Hennessy VS'), price: 8 },
        { name: L('Crème de café ou de mangue à la tequila', 'Coffee or mango cream with tequila'), price: 6 },
      ],
    },
  ],
};

export const menuGroups: MenuGroup[] = [lunch, dinner, cocktails, drinks];

/** Dishes highlighted on the home page. */
export const highlights: MenuItem[] = [
  dinner.sections[1].items[3], // curry de poulet
  dinner.sections[1].items[2], // biryani saumon
  dinner.sections[1].items[1], // boeuf confit
  dinner.sections[3].items[0], // moelleux au chocolat
];

export function formatPrice(value: number, lang: Lang): string {
  const n = value.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return lang === 'fr' ? `${n} €` : `€${n}`;
}
