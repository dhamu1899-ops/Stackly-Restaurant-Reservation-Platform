// Global Data Store for Stackly Luxury Platform

const DEMO_USERS = {
  client: {
    id: 'user-client-01',
    name: 'Alexander Sterling',
    email: 'alexander.sterling@stackly.com',
    role: 'client',
    roleTitle: 'Black Diamond VIP Gastronome',
    membershipTier: 'Black Diamond VIP',
    dinerSince: '2023',
    loyaltyPoints: 14250,
    avatar: 'assets/asset-14.webp',
    phone: '+1 (555) 234-8900',
    city: 'New York & Paris',
    dietaryNotes: 'Pescatarian, Truffle enthusiast, Burgundy wine collector',
    favoriteCuisines: ['French Haute Cuisine', 'Modern Kaiseki', 'Italian Coastal']
  },
  admin: {
    id: 'user-admin-01',
    name: 'Chef Laurent Mercier',
    email: 'admin@stackly.com',
    role: 'admin',
    roleTitle: 'Director of Restaurant Operations & Maître D’',
    membershipTier: 'Executive Maitre D',
    dinerSince: '2021',
    loyaltyPoints: 9800,
    avatar: 'assets/asset-15.webp',
    phone: '+1 (212) 555-0199',
    city: 'New York (Lexington Ave Hub)',
    dietaryNotes: 'All degustation pairing certified',
    favoriteCuisines: ['Modern French', 'Japanese Omakase', 'New Nordic']
  }
};

const EXPERIENCES_DATA = [
  {
    id: 'exp-1',
    title: 'Master Sommelier 1982 Vintage Cellar Unlocking',
    subtitle: 'Taste 5 legendary First Growth Bordeaux and Grand Cru Burgundies directly from historical vaults.',
    restaurantName: 'Château de la Vigne',
    restaurantId: 'rest-cellar-bordeaux',
    location: 'Saint-Émilion, Bordeaux',
    dateString: 'Every Thursday & Saturday • 16:30',
    pricePerPerson: 480,
    duration: '3.5 Hours',
    image: 'assets/asset-16.webp',
    tags: ['Exclusive Cellar Access', 'Grand Cru Pourings', 'Artisanal Charcuterie & Truffles'],
    spotsRemaining: 4,
    description: 'Descend 15 meters below ground into our 1750 limestone crypts. Guided by Master Sommelier Camille de Ronsard, unlock archived bottles spanning four decades with paired aged Comté cheeses and black Périgord truffles.',
    highlights: [
      'Private access to restricted underground reserve vault',
      'Tasting of 1982 Château Margaux, 1990 Latour, 2005 d’Yquem',
      'Personalized crystal Riedel sommelier decanter gift to take home',
      'Intimate group strictly capped at 8 connoisseurs'
    ],
    curatedBy: 'Master Sommelier Camille de Ronsard'
  },
  {
    id: 'exp-2',
    title: 'Secret Toyosu Knife & Nigiri Masterclass with Master Shibata',
    subtitle: 'Learn the sacred discipline of Edomae fish aging, knife precision, and Akazu rice balancing.',
    restaurantName: 'Shibata Omakase',
    restaurantId: 'rest-omakase-shibata',
    location: 'Ginza, Tokyo',
    dateString: 'Sundays • 11:00 AM - 14:30',
    pricePerPerson: 650,
    duration: '3.5 Hours',
    image: 'assets/asset-17.webp',
    tags: ['Hands-On Culinary Art', 'Sakai Takayuki Knife Gift', 'Full 16-Course Luncheon'],
    spotsRemaining: 2,
    description: 'An once-in-a-lifetime opportunity to stand beside Master Kenjiro Shibata behind the 300-year hinoki counter. Learn the art of shime (vinegar curing), precise slicing of wild bluefin tuna, and shape nigiri under master supervision.',
    highlights: [
      'Handcrafted custom Sakai Takayuki sushi knife engraved with your name',
      'Direct hands-on instruction in Edomae nigiri sculpting',
      'Curated rare Junmai Daiginjo sake pairing throughout the session',
      'Limited to 4 participants per masterclass'
    ],
    curatedBy: 'Master Kenjiro Shibata'
  },
  {
    id: 'exp-3',
    title: 'Sunset Yacht & Cliffside Truffle Feast in Positano',
    subtitle: 'Private wooden Riva boat cruise along the Amalfi cliffs followed by a candlelit dinner over the sea.',
    restaurantName: 'Il Giardino Sul Mare',
    restaurantId: 'rest-terrazza-amalfi',
    location: 'Positano, Amalfi Coast',
    dateString: 'Daily at 17:00 (May - October)',
    pricePerPerson: 520,
    duration: '4.5 Hours',
    image: 'assets/asset-18.webp',
    tags: ['Private Riva Yacht', 'Sunset Champagne', 'Front-Row Cliff Table'],
    spotsRemaining: 3,
    description: 'Begin with a private 90-minute sunset glide along the Capri and Li Galli islands with vintage Franciacorta champagne and red prawn crudo on board. Disembark directly onto the private sea pier of Il Giardino Sul Mare for your reserved cliff-edge tasting.',
    highlights: [
      'Private Riva motor yacht transfer with captain & chilled vintage champagne',
      'Guaranteed front-row edge table (Table 01)',
      'Chef Matteo’s 8-course Mediterranean Truffle Degustation',
      'Live classical Italian guitarist serenading table-side'
    ],
    curatedBy: 'Chef Matteo Moretti & Captain Donato'
  },
  {
    id: 'exp-4',
    title: 'Midnight Fire & Wagyu Caviar Symphony on the Palm',
    subtitle: 'Multi-sensory Basque open-fire theater, whole 90-day dry aged ribeyes, and rare mezcal smoke pairings.',
    restaurantName: 'Asador del Oro',
    restaurantId: 'rest-flame-dubai',
    location: 'Palm Jumeirah, Dubai',
    dateString: 'Fridays & Saturdays • 22:00',
    pricePerPerson: 390,
    duration: '3 Hours',
    image: 'assets/asset-19.webp',
    tags: ['Open Charcoal Theater', '24K Gold Leaf Caviar', 'Skyline Fireworks View'],
    spotsRemaining: 6,
    description: 'An electric evening perched on the royal terrace overlooking the Marina skyline. Master Asador Javier demonstrates primal Basque charcoal grilling techniques with 24K gold wagyu, paired with smoking infusions and live ambient percussion.',
    highlights: [
      'Table-side live dry-aging slicing and charcoal searing presentation',
      'Royal Baeri caviar and 24K gold Wagyu tartare course',
      'Priority VIP lounge seating with uninterrupted Dubai fireworks views',
      'Bespoke oak-smoked cocktail and vintage Rioja pairings'
    ],
    curatedBy: 'Chef Javier Aranzadi'
  }
];

const JOURNAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'The Unwritten Etiquette of Three-Star Michelin Dining in Paris & New York',
    subtitle: 'From dress codes and sommelier dialogues to tipping nuances, master the unspoken rules of the world’s most refined dining rooms.',
    category: 'Gastronomy Culture',
    readTime: '6 min read',
    date: 'August 28, 2026',
    author: 'Eleanor Vance, Culinary Critic',
    image: 'assets/asset-08.webp',
    excerpt: 'Stepping into a temple of haute cuisine is an immersive artistic performance where diners and service staff participate in a synchronized ballet...'
  },
  {
    id: 'art-2',
    title: 'Decoding the 2026 Michelin Stars: Why Counter Dining is Dominating the World’s 50 Best',
    subtitle: 'Why the era of distant dining is making way for intimate 8-to-12 seat chef counters and live hearth theater.',
    category: 'Global Trends',
    readTime: '8 min read',
    date: 'August 19, 2026',
    author: 'Chef Laurent Vasseur',
    image: 'assets/asset-20.webp',
    excerpt: 'Modern fine diners no longer wish to be separated from the culinary flame. They crave intimacy, hearing the sizzle of charcoal and dialogue with the chef...'
  },
  {
    id: 'art-3',
    title: 'The Art of Terroir: Why Wild Foraging in the Nordic Wilderness is Reshaping Fine Dining',
    subtitle: 'How Chef Freja Lindqvist and her team transform foraged pine cones, sea buckthorn, and birch sap into world-celebrated dishes.',
    category: 'Culinary Philosophy',
    readTime: '5 min read',
    date: 'August 12, 2026',
    author: 'Sven Lindgren, Stockholm',
    image: 'assets/asset-21.webp',
    excerpt: 'At 5:00 AM on the Stockholm archipelago, the morning mist still blankets the mossy granite stones as chef apprentices harvest fresh juniper...'
  }
];

const RESTAURANTS_DATA = [
  {
    id: 'rest-lumina-nyc',
    name: 'L’Aura Élégante',
    tagline: 'Modern French gastronomy overlooking the Manhattan skyline with 3 Michelin Stars',
    slug: 'laura-elegante-nyc',
    cuisine: 'Modern French & Neo-Gastronomy',
    michelinStars: 3,
    awards: ['3 Michelin Stars 2024', "World's 50 Best #7", 'Wine Spectator Grand Award', 'James Beard Award'],
    priceRange: '$$$$',
    pricePerPerson: 385,
    neighborhood: 'Hudson Yards',
    city: 'New York',
    country: 'United States',
    address: '500 W 33rd St, 64th Floor, New York, NY 10001',
    lat: 40.7538,
    lng: -74.0018,
    rating: 4.98,
    reviewCount: 620,
    heroImage: 'assets/asset-22.webp',
    gallery: [
      'assets/asset-19.webp',
      'assets/asset-23.webp',
      'assets/asset-08.webp',
      'assets/asset-24.webp',
      'assets/asset-25.webp'
    ],
    ambienceTags: ['Panoramic Skyline', 'Romantic & Dimly Lit', 'Chef Counter Tasting', 'Black Tie Recommended', 'Rare Cellar'],
    dietaryOptions: ['Vegetarian Tasting Available', 'Gluten-Free Menu', 'Pescatarian', 'Nut-Free Accommodated'],
    featured: true,
    trendingToday: true,
    urgentTablesCount: 2,
    seatingAreas: [
      {
        id: 'chef-counter',
        name: 'The Grand Chef’s Counter',
        description: 'Front-row 12-seat marble counter facing the open master kitchen with personal culinary commentary.',
        priceExtra: 65,
        minParty: 1,
        maxParty: 4,
        iconName: 'ChefHat',
        isExclusive: true,
        photoUrl: 'assets/asset-02.webp'
      },
      {
        id: 'skyline-window',
        name: 'Skyline Panorama Booth',
        description: 'Elevated banquette with 270-degree floor-to-ceiling glass views of the Hudson River and sunset.',
        priceExtra: 40,
        minParty: 2,
        maxParty: 4,
        iconName: 'Sparkles',
        isExclusive: true,
        photoUrl: 'assets/asset-26.webp'
      },
      {
        id: 'main-dining',
        name: 'Main Crystal Salon',
        description: 'Our soaring main dining room adorned with bespoke crystal chandeliers and plush velvet seating.',
        priceExtra: 0,
        minParty: 1,
        maxParty: 8,
        iconName: 'Utensils',
        photoUrl: 'assets/asset-27.webp'
      },
      {
        id: 'wine-vault',
        name: 'Sommelier’s Vault Room',
        description: 'Enclosed private glass cellar surrounded by 4,000 vintage grand cru bottles.',
        priceExtra: 95,
        minParty: 4,
        maxParty: 10,
        iconName: 'Wine',
        isExclusive: true,
        photoUrl: 'assets/asset-03.webp'
      }
    ],
    tables: [
      { id: 't1', number: 1, name: 'Chef Counter 01', seatingAreaId: 'chef-counter', capacity: 2, xPercent: 22, yPercent: 25, shape: 'counter', isAvailable: true, tag: 'Best View of Pass' },
      { id: 't2', number: 2, name: 'Chef Counter 02', seatingAreaId: 'chef-counter', capacity: 2, xPercent: 32, yPercent: 25, shape: 'counter', isAvailable: false, tag: 'Reserved' },
      { id: 't3', number: 3, name: 'Chef Counter 03', seatingAreaId: 'chef-counter', capacity: 2, xPercent: 42, yPercent: 25, shape: 'counter', isAvailable: true, tag: 'Available' },
      { id: 't4', number: 10, name: 'Skyline Window 10', seatingAreaId: 'skyline-window', capacity: 2, xPercent: 78, yPercent: 22, shape: 'booth', isAvailable: true, tag: 'Sunset Golden Hour' },
      { id: 't5', number: 11, name: 'Skyline Window 11', seatingAreaId: 'skyline-window', capacity: 4, xPercent: 78, yPercent: 45, shape: 'booth', isAvailable: false, tag: 'Reserved' },
      { id: 't6', number: 12, name: 'Skyline Corner 12', seatingAreaId: 'skyline-window', capacity: 2, xPercent: 78, yPercent: 70, shape: 'booth', isAvailable: true, tag: 'VIP Corner' },
      { id: 't7', number: 20, name: 'Center Salon 20', seatingAreaId: 'main-dining', capacity: 4, xPercent: 30, yPercent: 55, shape: 'round', isAvailable: true, tag: 'Under Chandelier' },
      { id: 't8', number: 21, name: 'Center Salon 21', seatingAreaId: 'main-dining', capacity: 4, xPercent: 48, yPercent: 55, shape: 'round', isAvailable: true, tag: 'Spacious' },
      { id: 't9', number: 22, name: 'Grand Oval 22', seatingAreaId: 'main-dining', capacity: 6, xPercent: 38, yPercent: 75, shape: 'round', isAvailable: true, tag: 'Large Group' },
      { id: 't10', number: 30, name: 'Wine Vault Table', seatingAreaId: 'wine-vault', capacity: 8, xPercent: 15, yPercent: 78, shape: 'rect', isAvailable: true, tag: 'Private Cellar' }
    ],
    timeSlots: [
      { time: '17:30', meal: 'Dinner', available: true, experience: 'Golden Hour 9-Course Tasting', remainingTables: 2, deposit: 100 },
      { time: '18:00', meal: 'Dinner', available: false, experience: 'Signature Degustation', remainingTables: 0 },
      { time: '19:15', meal: 'Dinner', available: true, experience: 'Grand Prestige 11-Course Tasting', remainingTables: 1, deposit: 150 },
      { time: '20:30', meal: 'Dinner', available: true, experience: 'Grand Prestige 11-Course Tasting', remainingTables: 3, deposit: 150 },
      { time: '21:45', meal: 'Late Night', available: true, experience: 'Late Evening Nocturne Tasting', remainingTables: 4, deposit: 100 }
    ],
    menus: [
      {
        category: 'Grand 11-Course Gastronomic Journey',
        description: 'A sensory voyage celebrating heritage French culinary architecture with rare international harvests.',
        pricePerPerson: 385,
        items: [
          {
            name: 'Imperial Osetra Caviar & Hokkaido Sea Urchin',
            description: 'Brioche emulsion, smoked dashi gelee, preserved Meyer lemon blossom.',
            price: 65,
            dietary: ['GF'],
            isSignature: true,
            pairingWine: '2012 Dom Pérignon Vintage Brut Champagne'
          },
          {
            name: 'Brittany Blue Lobster in Truffle Silk',
            description: 'Poached gently in brown butter, winter Perigord black truffle foam, sunchoke velouté.',
            price: 85,
            dietary: ['GF'],
            isSignature: true,
            pairingWine: '2018 Domaine Leflaive Puligny-Montrachet'
          },
          {
            name: 'A5 Miyazaki Wagyu Tenderloin',
            description: 'Charred binchotan crust, fermented black garlic jus, matsutake mushroom tartlet.',
            price: 110,
            isSignature: true,
            pairingWine: '2015 Château Margaux Premier Grand Cru'
          },
          {
            name: 'Golden Sphere of Calvados & Valrhona Chocolate',
            description: 'Flambéed with 25-year aged Norman apple brandy, Madagascar bourbon vanilla cream.',
            price: 35,
            dietary: ['VG'],
            pairingWine: '1998 Château d’Yquem Sauternes'
          }
        ]
      },
      {
        category: 'Prestige Sommelier Wine Cellar Pairings',
        description: 'Carefully curated rare vintages from legendary estates, poured by our Head Master Sommelier.',
        pricePerPerson: 220,
        items: [
          {
            name: 'Grand Cru Terroir Pairing (7 Pours)',
            description: 'Rare premier cru allocations from Burgundy, Bordeaux, Barolo, and Champagne.',
            price: 220
          },
          {
            name: 'Imperial Icon Allocation (7 Vintage Pours)',
            description: 'Single-vineyard library reserves spanning back to 1982.',
            price: 450
          }
        ]
      }
    ],
    chef: {
      name: 'Chef Laurent Vasseur',
      role: 'Executive Chef & Co-Proprietor',
      bio: 'Trained under Joël Robuchon and Alain Ducasse in Paris, Chef Laurent brings 25 years of uncompromising mastery, seamlessly merging timeless French classical technique with avant-garde culinary theater.',
      photo: 'assets/asset-28.webp',
      signatureDish: 'Brittany Blue Lobster in Perigord Truffle Silk',
      accolades: ['3 Michelin Stars (2018-2024)', 'Knight of the Order of Agricultural Merit', 'James Beard Best Chef in the Americas']
    },
    details: {
      dressCode: 'Elegant Attire / Black Tie Welcome (Jackets required for gentlemen; no sneakers or sportswear).',
      cancellationPolicy: 'Cancellations made 48 hours prior to reservation receive full refund. Late cancellations incur $100/guest.',
      corkagePolicy: 'Maximum 2 bottles of 750ml wine not on our cellar list; $95 corkage fee per bottle.',
      valetParking: true,
      privateDiningCapacity: 28,
      phone: '+1 (212) 890-4400',
      email: 'reservations@laura-elegante.com',
      hours: [
        { days: 'Tuesday - Saturday', dinner: '17:30 - 23:30' },
        { days: 'Sunday', dinner: '17:00 - 22:30' },
        { days: 'Monday', dinner: 'Closed for private cellar events' }
      ]
    },
    reviews: [
      {
        id: 'rev-1',
        dinerName: 'Lady Genevieve Sterling',
        dinerCity: 'London & New York',
        avatar: 'assets/asset-29.webp',
        isVerifiedVIP: true,
        date: 'August 14, 2026',
        rating: 5.0,
        foodRating: 5.0,
        serviceRating: 5.0,
        ambienceRating: 5.0,
        wineRating: 5.0,
        comment: 'An ethereal evening. Chef Laurent’s mastery of the blue lobster and the Dom Pérignon pairing made this one of the top dining moments of my life. The skyline view from Booth 10 as dusk settled over Hudson Yards was magical.',
        experiencedDish: 'Brittany Blue Lobster with 2018 Puligny-Montrachet',
        photos: ['assets/asset-30.webp']
      },
      {
        id: 'rev-2',
        dinerName: 'Marcus Thorne',
        dinerCity: 'San Francisco',
        avatar: 'assets/asset-31.webp',
        isVerifiedVIP: true,
        date: 'July 28, 2026',
        rating: 4.9,
        foodRating: 5.0,
        serviceRating: 4.9,
        ambienceRating: 5.0,
        wineRating: 5.0,
        comment: 'We booked the Chef’s Counter for our 10th anniversary. Watching the kitchen symphony with synchrony was breathtaking. Flawless hospitality from start to finish.',
        experiencedDish: 'A5 Miyazaki Wagyu & Caviar Course'
      }
    ]
  },
  {
    id: 'rest-omakase-shibata',
    name: 'Shibata Omakase',
    tagline: 'Hyper-seasonal Edomae 22-course counter sushi flown directly from Toyosu Market daily',
    slug: 'shibata-omakase-tokyo-ginza',
    cuisine: 'Authentic Edomae Omakase & Kaiseki',
    michelinStars: 3,
    awards: ['3 Michelin Stars 2024', "World's 50 Best Asia #3", 'Tabelog Gold Award Winner'],
    priceRange: '$$$$',
    pricePerPerson: 420,
    neighborhood: 'Ginza / Roppongi Hills',
    city: 'Tokyo',
    country: 'Japan',
    address: '6-10-1 Ginza, Chuo-ku, Tokyo 104-0061',
    lat: 35.6698,
    lng: 139.7645,
    rating: 4.99,
    reviewCount: 410,
    heroImage: 'assets/asset-32.webp',
    gallery: [
      'assets/asset-17.webp',
      'assets/asset-33.webp',
      'assets/asset-34.webp',
      'assets/asset-35.webp'
    ],
    ambienceTags: ['Intimate 8-Seat Hinoki Wood', 'Master Knife Craft', 'Rare Sakes', 'Zen Minimalist', 'Zero Distractions'],
    dietaryOptions: ['Strict Seafood & Shellfish Focused', 'Gluten-Free Shoyu Available with Notice'],
    featured: true,
    trendingToday: true,
    urgentTablesCount: 1,
    seatingAreas: [
      {
        id: 'hinoki-counter',
        name: '300-Year Hinoki Wood Counter',
        description: 'Single-slab Japanese cypress counter seating only 8 guests per seating for direct interaction with Master Shibata.',
        priceExtra: 0,
        minParty: 1,
        maxParty: 4,
        iconName: 'Sparkles',
        isExclusive: true,
        photoUrl: 'assets/asset-36.webp'
      },
      {
        id: 'private-tatami',
        name: 'Private Horigotatsu Tea Room',
        description: 'Traditional sunken table chamber with private sushi artisan service and garden courtyard view.',
        priceExtra: 120,
        minParty: 4,
        maxParty: 6,
        iconName: 'Crown',
        isExclusive: true,
        photoUrl: 'assets/asset-37.webp'
      }
    ],
    tables: [
      { id: 'sh1', number: 1, name: 'Hinoki Seat 1', seatingAreaId: 'hinoki-counter', capacity: 1, xPercent: 20, yPercent: 40, shape: 'counter', isAvailable: true, tag: 'Center Master View' },
      { id: 'sh2', number: 2, name: 'Hinoki Seat 2', seatingAreaId: 'hinoki-counter', capacity: 1, xPercent: 28, yPercent: 40, shape: 'counter', isAvailable: true, tag: 'Center Master View' },
      { id: 'sh3', number: 3, name: 'Hinoki Seat 3', seatingAreaId: 'hinoki-counter', capacity: 1, xPercent: 36, yPercent: 40, shape: 'counter', isAvailable: false, tag: 'Reserved' },
      { id: 'sh4', number: 4, name: 'Hinoki Seat 4', seatingAreaId: 'hinoki-counter', capacity: 1, xPercent: 44, yPercent: 40, shape: 'counter', isAvailable: false, tag: 'Reserved' },
      { id: 'sh5', number: 5, name: 'Private Tatami Room', seatingAreaId: 'private-tatami', capacity: 6, xPercent: 75, yPercent: 60, shape: 'booth', isAvailable: true, tag: 'Exclusive Alcove' }
    ],
    timeSlots: [
      { time: '17:30', meal: 'Dinner', available: true, experience: 'First Seating (22-Piece Nigiri & Otsumami)', remainingTables: 1, deposit: 200 },
      { time: '20:15', meal: 'Dinner', available: true, experience: 'Second Seating (22-Piece Nigiri & Otsumami)', remainingTables: 2, deposit: 200 }
    ],
    menus: [
      {
        category: 'Winter Grand Omakase 22-Course',
        description: 'Seasonally curated marine treasures seasoned with seasoned Akazu aged red vinegar rice.',
        pricePerPerson: 420,
        items: [
          {
            name: 'Otoro Aburi with Binchotan Charcoal Smoke',
            description: 'Wild Bluefin tuna belly brushed with 10-year aged nikiri soy, grated Shizuoka mountain wasabi.',
            price: 45,
            isSignature: true,
            pairingWine: 'Isojiman Junmai Daiginjo Nakadori'
          },
          {
            name: 'Hokkaido Murasaki & Bafun Uni Dual Tasting',
            description: 'Cold-water sea urchin gently layered over hand-harvested Ariake roasted seaweed.',
            price: 55,
            isSignature: true,
            pairingWine: 'Kokuryu "Black Dragon" Shizuku Sake'
          },
          {
            name: 'Steamed Shizuoka Kuro Awabi (Black Abalone)',
            description: 'Slow-simmered for 8 hours in sake, served with its rich warm liver risotto.',
            price: 60,
            isSignature: true,
            pairingWine: '2019 Meursault Domaine des Comtes Lafon'
          }
        ]
      }
    ],
    chef: {
      name: 'Master Kenjiro Shibata',
      role: 'Sushishi Master & 4th Generation Artisan',
      bio: 'With 38 years dedicated purely to the discipline of sushi crafting, Master Shibata personally visits the Toyosu market at 4:30 AM every day to choose the top catch.',
      photo: 'assets/asset-38.webp',
      signatureDish: 'Abalone in Warm Liver Emulsion with Akazu Rice',
      accolades: ['3 Michelin Stars (11 Consecutive Years)', 'Living Cultural Culinary Treasure of Tokyo']
    },
    details: {
      dressCode: 'Smart Casual / No strong perfumes or colognes out of respect for fish delicate aromas.',
      cancellationPolicy: 'Due to custom daily market sourcing, cancellations within 72 hours are non-refundable.',
      corkagePolicy: 'No BYOB permitted; our sake sommelier cellar houses over 80 rare micro-brewery allocations.',
      valetParking: false,
      privateDiningCapacity: 6,
      phone: '+81 3-5555-0192',
      email: 'ginza@shibata-omakase.jp',
      hours: [
        { days: 'Tuesday - Sunday', dinner: '17:30 & 20:15 Seatings strictly' },
        { days: 'Monday', dinner: 'Closed for sourcing expeditions' }
      ]
    },
    reviews: [
      {
        id: 'rev-3',
        dinerName: 'Kenzo Takahashi',
        dinerCity: 'Kyoto',
        avatar: 'assets/asset-39.webp',
        isVerifiedVIP: true,
        date: 'August 22, 2026',
        rating: 5.0,
        foodRating: 5.0,
        serviceRating: 5.0,
        ambienceRating: 5.0,
        wineRating: 5.0,
        comment: 'Pure culinary nirvana. The abalone liver risotto is unrivaled. Master Shibata’s humble warmth makes this rarefied experience unforgettable.',
        experiencedDish: 'Winter Grand Omakase with Master Sake Pairing'
      }
    ]
  },
  {
    id: 'rest-terrazza-amalfi',
    name: 'Il Giardino Sul Mare',
    tagline: 'Cliffside Amalfi Mediterranean dining with ancient lemon groves and coastal seafood',
    slug: 'il-giardino-sul-mare-amalfi',
    cuisine: 'Coastal Italian & Mediterranean Haute Cuisine',
    michelinStars: 2,
    awards: ['2 Michelin Stars 2024', 'Best Coastal Restaurant in Europe', 'Forbes 5-Star Dining'],
    priceRange: '$$$',
    pricePerPerson: 275,
    neighborhood: 'Positano Cliffside',
    city: 'Amalfi Coast',
    country: 'Italy',
    address: 'Via Cristoforo Colombo 30, Positano, Italy',
    lat: 40.6281,
    lng: 14.485,
    rating: 4.95,
    reviewCount: 780,
    heroImage: 'assets/asset-40.webp',
    gallery: [
      'assets/asset-18.webp',
      'assets/asset-41.webp',
      'assets/asset-42.webp',
      'assets/asset-43.webp'
    ],
    ambienceTags: ['Cliffside Sunset Views', 'Lemon Pergola Terrace', 'Live Mediterranean Guitar', 'Candlelit Tables', 'Romantic'],
    dietaryOptions: ['Vegetarian Friendly', 'Gluten-Free Fresh Pasta Available', 'Organic Farm-to-Table'],
    featured: true,
    trendingToday: false,
    urgentTablesCount: 3,
    seatingAreas: [
      {
        id: 'cliff-terrace',
        name: 'The Edge of Eternity Terrace',
        description: 'Front-row tables directly suspended above the turquoise Tyrrhenian Sea with sunset views.',
        priceExtra: 50,
        minParty: 2,
        maxParty: 4,
        iconName: 'Sparkles',
        isExclusive: true,
        photoUrl: 'assets/asset-04.webp'
      },
      {
        id: 'lemon-pergola',
        name: 'Historic Lemon Pergola Garden',
        description: 'Dine beneath 150-year-old blooming Sorrento lemon trees illuminated by hanging lanterns.',
        priceExtra: 20,
        minParty: 2,
        maxParty: 8,
        iconName: 'Utensils',
        photoUrl: 'assets/asset-44.webp'
      },
      {
        id: 'villa-salon',
        name: 'Villa Fresco Dining Room',
        description: 'Inside the 18th-century noble palazzo featuring restored Italian ceiling frescoes.',
        priceExtra: 0,
        minParty: 1,
        maxParty: 6,
        iconName: 'Crown',
        photoUrl: 'assets/asset-45.webp'
      }
    ],
    tables: [
      { id: 'it1', number: 1, name: 'Cliff Edge Table 01', seatingAreaId: 'cliff-terrace', capacity: 2, xPercent: 20, yPercent: 20, shape: 'round', isAvailable: true, tag: 'Direct Sunset' },
      { id: 'it2', number: 2, name: 'Cliff Edge Table 02', seatingAreaId: 'cliff-terrace', capacity: 2, xPercent: 40, yPercent: 20, shape: 'round', isAvailable: false, tag: 'Reserved' },
      { id: 'it3', number: 3, name: 'Cliff Edge Table 03', seatingAreaId: 'cliff-terrace', capacity: 4, xPercent: 65, yPercent: 20, shape: 'round', isAvailable: true, tag: 'Panoramic Sea' },
      { id: 'it4', number: 10, name: 'Lemon Pergola 10', seatingAreaId: 'lemon-pergola', capacity: 4, xPercent: 25, yPercent: 60, shape: 'rect', isAvailable: true, tag: 'Under Lemon Canopy' },
      { id: 'it5', number: 11, name: 'Lemon Pergola 11', seatingAreaId: 'lemon-pergola', capacity: 6, xPercent: 50, yPercent: 60, shape: 'rect', isAvailable: true, tag: 'Garden Alcove' },
      { id: 'it6', number: 20, name: 'Palazzo Fresco 20', seatingAreaId: 'villa-salon', capacity: 4, xPercent: 80, yPercent: 60, shape: 'round', isAvailable: true, tag: 'Historic Fresco' }
    ],
    timeSlots: [
      { time: '12:30', meal: 'Lunch', available: true, experience: 'Sunlit Coastal Lunch Tasting', remainingTables: 4 },
      { time: '13:45', meal: 'Lunch', available: true, experience: 'Sunlit Coastal Lunch Tasting', remainingTables: 2 },
      { time: '19:00', meal: 'Dinner', available: true, experience: 'Sunset Amalfi 8-Course Journey', remainingTables: 2, deposit: 80 },
      { time: '21:15', meal: 'Dinner', available: true, experience: 'Starlight Romance Mediterranean Tasting', remainingTables: 3, deposit: 80 }
    ],
    menus: [
      {
        category: 'Tasting Menu "Profumi di Amalfi"',
        description: 'An ode to Mediterranean fisherman harvests, Capri herbs, and hand-rolled pasta.',
        pricePerPerson: 275,
        items: [
          {
            name: 'Carpaccio di Gambero Rosso di Mazara',
            description: 'Red prawns, wild fennel pollen, candied Amalfi lemon peel, frozen olive oil caviar.',
            price: 48,
            dietary: ['GF', 'DF'],
            isSignature: true,
            pairingWine: '2021 Marisa Cuomo Furore Bianco Fiorduva'
          },
          {
            name: 'Hand-Cut Tagliolini with White Truffle & Sea Urchin',
            description: '36-yolk fresh pasta, emulsion of butter and sea urchin, freshly shaved Alba white truffle.',
            price: 68,
            isSignature: true,
            pairingWine: '2019 Gaja Rossj-Bass Chardonnay'
          },
          {
            name: 'Dentice in Crosta di Sale alle Erbe',
            description: 'Wild sea bream baked in Mediterranean salt crust, sautéed wild greens, salmoriglio sauce.',
            price: 72,
            dietary: ['GF'],
            pairingWine: '2017 Tignanello Antinori'
          }
        ]
      }
    ],
    chef: {
      name: 'Chef Matteo Moretti',
      role: 'Head Chef',
      bio: 'Born on the cliffs of Amalfi, Matteo learned from his nonna before working across 3-star kitchens in Milan and Rome. His food is a love letter to the Campania sea.',
      photo: 'assets/asset-46.webp',
      signatureDish: 'Hand-Cut Tagliolini with Sea Urchin & White Truffle',
      accolades: ['2 Michelin Stars (2021-2024)', 'Gambero Rosso Top Chef of Southern Italy']
    },
    details: {
      dressCode: 'Resort Chic / Smart Casual (Collared shirts for men; sandals welcome).',
      cancellationPolicy: 'Cancellations 24 hours in advance are complimentary.',
      corkagePolicy: '€60 corkage fee per bottle.',
      valetParking: true,
      privateDiningCapacity: 35,
      phone: '+39 089 875 210',
      email: 'prenotazioni@giardinopositano.it',
      hours: [
        { days: 'Every Day', lunch: '12:00 - 15:30', dinner: '19:00 - 23:30' }
      ]
    },
    reviews: [
      {
        id: 'rev-4',
        dinerName: 'Claire & Julien Beaumont',
        dinerCity: 'Paris',
        avatar: 'assets/asset-47.webp',
        isVerifiedVIP: true,
        date: 'August 27, 2026',
        rating: 5.0,
        foodRating: 5.0,
        serviceRating: 5.0,
        ambienceRating: 5.0,
        wineRating: 4.8,
        comment: 'We got engaged on Table 01 right as the sun set over Positano! The staff surprised us with vintage champagne and personalized menus. Absolute perfection.',
        experiencedDish: 'Hand-Cut Tagliolini with Sea Urchin'
      }
    ]
  },
  {
    id: 'rest-nordic-sol',
    name: 'Kallio & Måne',
    tagline: 'Hyper-foraged contemporary Nordic dining and wood-fire gastronomy in Stockholm archipelago',
    slug: 'kallio-and-mane-stockholm',
    cuisine: 'Modern Nordic & Foraged Wild Gastronomy',
    michelinStars: 3,
    awards: ['3 Michelin Stars 2024', 'Michelin Green Star for Sustainability', 'World’s 50 Best #12'],
    priceRange: '$$$$',
    pricePerPerson: 350,
    neighborhood: 'Östermalm / Waterfront',
    city: 'Stockholm',
    country: 'Sweden',
    address: 'Strandvägen 44, 114 56 Stockholm, Sweden',
    lat: 59.3326,
    lng: 18.0818,
    rating: 4.96,
    reviewCount: 510,
    heroImage: 'assets/asset-48.webp',
    gallery: [
      'assets/asset-21.webp',
      'assets/asset-49.webp',
      'assets/asset-50.webp'
    ],
    ambienceTags: ['Scandi Minimalist', 'Open Birch Fire', 'Archipelago Water View', 'Botanical Pairing', 'Green Star'],
    dietaryOptions: ['Zero-Waste Vegetarian Journey', 'Gluten-Free Friendly', 'Lactose-Free Options'],
    featured: false,
    trendingToday: true,
    urgentTablesCount: 2,
    seatingAreas: [
      {
        id: 'hearth-room',
        name: 'The Open Birch Hearth Counter',
        description: 'Intimate counter facing the live birch wood-fire embers and fermentation laboratory.',
        priceExtra: 45,
        minParty: 1,
        maxParty: 4,
        iconName: 'Flame',
        isExclusive: true,
        photoUrl: 'assets/asset-51.webp'
      },
      {
        id: 'archipelago-hall',
        name: 'Waterfront Atrium Dining',
        description: 'Floor-to-ceiling panoramic glass facing the Stockholm archipelago channels.',
        priceExtra: 0,
        minParty: 2,
        maxParty: 8,
        iconName: 'Utensils',
        photoUrl: 'assets/asset-05.webp'
      }
    ],
    tables: [
      { id: 'no1', number: 1, name: 'Hearth Counter 01', seatingAreaId: 'hearth-room', capacity: 2, xPercent: 25, yPercent: 30, shape: 'counter', isAvailable: true, tag: 'Fireplace Front' },
      { id: 'no2', number: 2, name: 'Hearth Counter 02', seatingAreaId: 'hearth-room', capacity: 2, xPercent: 40, yPercent: 30, shape: 'counter', isAvailable: true, tag: 'Fireplace Front' },
      { id: 'no3', number: 10, name: 'Waterfront Table 10', seatingAreaId: 'archipelago-hall', capacity: 4, xPercent: 70, yPercent: 40, shape: 'round', isAvailable: true, tag: 'Canal View' },
      { id: 'no4', number: 11, name: 'Waterfront Table 11', seatingAreaId: 'archipelago-hall', capacity: 6, xPercent: 70, yPercent: 70, shape: 'round', isAvailable: false, tag: 'Reserved' }
    ],
    timeSlots: [
      { time: '18:00', meal: 'Dinner', available: true, experience: 'Nordic Wilderness 14-Course Expedition', remainingTables: 2, deposit: 120 },
      { time: '19:30', meal: 'Dinner', available: true, experience: 'Nordic Wilderness 14-Course Expedition', remainingTables: 1, deposit: 120 },
      { time: '20:45', meal: 'Dinner', available: true, experience: 'Nordic Wilderness 14-Course Expedition', remainingTables: 3, deposit: 120 }
    ],
    menus: [
      {
        category: 'Nordic Wilderness 14-Course Expedition',
        description: 'Foraged mushrooms, cloudberries, cured reindeer, fermented birch sap, and wild Baltic catches.',
        pricePerPerson: 350,
        items: [
          {
            name: 'Smoked King Crab & Fermented Sea Buckthorn',
            description: 'Cooked directly over juniper branches, brown butter garum, foraged spruce oil.',
            price: 65,
            dietary: ['GF', 'DF'],
            isSignature: true,
            pairingWine: '2020 Keller Riesling Trocken'
          },
          {
            name: 'Aged Venison Loin with Pine Cone Glaze',
            description: 'Smoked lingonberries, roasted Jerusalem artichoke mousse, bone marrow emulsion.',
            price: 78,
            dietary: ['GF'],
            isSignature: true,
            pairingWine: '2016 Domaine Dujac Morey-Saint-Denis'
          }
        ]
      }
    ],
    chef: {
      name: 'Chef Freja Lindqvist',
      role: 'Chef Patron & Foraging Specialist',
      bio: 'Freja spend mornings foraging in the Swedish forests before heading into the kitchen. Her approach to sustainability and fermented gastronomy has redefined contemporary Nordic cuisine.',
      photo: 'assets/asset-28.webp',
      signatureDish: 'Birch Ember King Crab with Fermented Sea Buckthorn',
      accolades: ['3 Michelin Stars (2022-2024)', 'Michelin Green Star for Gastronomic Ecology']
    },
    details: {
      dressCode: 'Smart Casual / Refined Scandi Minimalist.',
      cancellationPolicy: '48 hours cancellation window for 100% refund.',
      corkagePolicy: 'SEK 700 per bottle.',
      valetParking: true,
      privateDiningCapacity: 16,
      phone: '+46 8 500 99 20',
      email: 'hallo@kalliomane.se',
      hours: [
        { days: 'Wednesday - Sunday', dinner: '18:00 - 23:30' },
        { days: 'Monday - Tuesday', dinner: 'Closed' }
      ]
    },
    reviews: [
      {
        id: 'rev-5',
        dinerName: 'Sven Lindgren',
        dinerCity: 'Copenhagen',
        avatar: 'assets/asset-52.webp',
        isVerifiedVIP: true,
        date: 'August 19, 2026',
        rating: 5.0,
        foodRating: 5.0,
        serviceRating: 5.0,
        ambienceRating: 4.9,
        wineRating: 5.0,
        comment: 'The sensory journey was unreal. The non-alcoholic botanical pairing made with house-fermented birch sap and cloudberries rivaled the premier cru wines!',
        experiencedDish: 'Smoked King Crab & Aged Venison'
      }
    ]
  },
  {
    id: 'rest-flame-dubai',
    name: 'Asador del Oro',
    tagline: 'Ultra-luxury open-fire Basque & dry-aged prime beef elevated on the Palm Jumeirah with 2 Stars',
    slug: 'asador-del-oro-dubai',
    cuisine: 'Basque Wood-Fire & Luxury Steakhouse',
    michelinStars: 2,
    awards: ['2 Michelin Stars Dubai 2024', 'Best Steakhouse in Middle East', 'World Best 101 Meat Restaurants #5'],
    priceRange: '$$$$',
    pricePerPerson: 310,
    neighborhood: 'Palm Jumeirah',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'The Boardwalk, Crescent Rd, Palm Jumeirah, Dubai',
    lat: 25.1124,
    lng: 55.139,
    rating: 4.94,
    reviewCount: 940,
    heroImage: 'assets/asset-22.webp',
    gallery: [
      'assets/asset-19.webp',
      'assets/asset-25.webp',
      'assets/asset-08.webp'
    ],
    ambienceTags: ['Burj Al Arab View', 'Open Fire Grills', 'Gold Leaf Accents', 'Luxury Shisha Lounge', 'Live DJ & Percussion'],
    dietaryOptions: ['100% Halal Certified Meats', 'Gluten-Free Options', 'Pescatarian Selection'],
    featured: false,
    trendingToday: true,
    urgentTablesCount: 4,
    seatingAreas: [
      {
        id: 'palace-terrace',
        name: 'The Palm Royal Terrace',
        description: 'Open-air palm terrace looking directly at the illuminated Dubai marina and fireworks display.',
        priceExtra: 50,
        minParty: 2,
        maxParty: 10,
        iconName: 'Sparkles',
        isExclusive: true,
        photoUrl: 'assets/asset-26.webp'
      },
      {
        id: 'gold-grill-room',
        name: 'Asador Firepit Lounge',
        description: 'Surrounding the 6-meter custom Basque charcoal grill with theater showmanship.',
        priceExtra: 0,
        minParty: 1,
        maxParty: 8,
        iconName: 'Flame',
        photoUrl: 'assets/asset-27.webp'
      }
    ],
    tables: [
      { id: 'db1', number: 1, name: 'Royal Palm Table 1', seatingAreaId: 'palace-terrace', capacity: 4, xPercent: 25, yPercent: 25, shape: 'round', isAvailable: true, tag: 'Direct Marina View' },
      { id: 'db2', number: 2, name: 'Royal Palm Table 2', seatingAreaId: 'palace-terrace', capacity: 6, xPercent: 55, yPercent: 25, shape: 'rect', isAvailable: true, tag: 'VIP Fireworks Lounge' },
      { id: 'db3', number: 10, name: 'Asador Grill 10', seatingAreaId: 'gold-grill-room', capacity: 4, xPercent: 35, yPercent: 65, shape: 'round', isAvailable: true, tag: 'Grill Theater' },
      { id: 'db4', number: 11, name: 'Asador Grill 11', seatingAreaId: 'gold-grill-room', capacity: 2, xPercent: 65, yPercent: 65, shape: 'round', isAvailable: false, tag: 'Reserved' }
    ],
    timeSlots: [
      { time: '19:00', meal: 'Dinner', available: true, experience: 'Royal Basque Asador Feast', remainingTables: 4, deposit: 100 },
      { time: '21:30', meal: 'Dinner', available: true, experience: 'Late Night Fire & Beats Tasting', remainingTables: 2, deposit: 150 },
      { time: '23:15', meal: 'Late Night', available: true, experience: 'Starlight Grill & Cocktails', remainingTables: 5 }
    ],
    menus: [
      {
        category: 'Royal Basque Asador Experience',
        description: 'Prime dry-aged heritage beef aged up to 90 days, roasted turbot, and charcoal tapas.',
        pricePerPerson: 310,
        items: [
          {
            name: '24K Gold Leaf Wagyu Tartare & Caviar',
            description: 'Hand-cut Rubia Gallega beef, Royal Baeri caviar, smoked egg yolk emulsion, grilled brioche.',
            price: 75,
            isSignature: true,
            pairingWine: '2016 Vega Sicilia Único Ribera del Duero'
          },
          {
            name: 'Basque Charcoal Grilled Wild Turbot (Rodaballo)',
            description: 'Cooked whole in traditional wire baskets over holm oak coals, garlic chili txakoli vinaigrette.',
            price: 110,
            dietary: ['GF', 'DF'],
            isSignature: true,
            pairingWine: '2020 Remelluri Blanco Rioja'
          },
          {
            name: '90-Day Dry-Aged Rubia Gallega Txuleta Ribeye',
            description: 'Charred rare over extreme heat, hand-harvested smoked sea salt flakes, piquillo peppers.',
            price: 145,
            dietary: ['GF'],
            isSignature: true,
            pairingWine: '2010 Pingus Ribera del Duero'
          }
        ]
      }
    ],
    chef: {
      name: 'Chef Javier Aranzadi',
      role: 'Master Asador',
      bio: 'Hailing from San Sebastián, Javier is revered globally as one of the preeminent masters of open-fire charcoal temperature control and artisan meat curing.',
      photo: 'assets/asset-38.webp',
      signatureDish: '90-Day Dry-Aged Txuleta with Piquillos',
      accolades: ['2 Michelin Stars', 'Master Griller Award of Spain']
    },
    details: {
      dressCode: 'Glamorous Evening Attire.',
      cancellationPolicy: '24-hour advance notice required.',
      corkagePolicy: 'AED 350 per bottle.',
      valetParking: true,
      privateDiningCapacity: 40,
      phone: '+971 4 818 2222',
      email: 'concierge@asadororo-dubai.ae',
      hours: [
        { days: 'Every Day', dinner: '18:30 - 02:00' }
      ]
    },
    reviews: [
      {
        id: 'rev-6',
        dinerName: 'Tariq Al-Mansoor',
        dinerCity: 'Dubai & London',
        avatar: 'assets/asset-31.webp',
        isVerifiedVIP: true,
        date: 'August 24, 2026',
        rating: 5.0,
        foodRating: 5.0,
        serviceRating: 5.0,
        ambienceRating: 5.0,
        wineRating: 4.9,
        comment: 'Best steak in the Middle East without question. The view of the Marina illuminated from the terrace while savoring the 90-day dry aged ribeye was world-class.',
        experiencedDish: '90-Day Dry-Aged Rubia Gallega Txuleta'
      }
    ]
  },
  {
    id: 'rest-cellar-bordeaux',
    name: 'Château de la Vigne',
    tagline: 'Historic 18th-century vineyard estate dining with century-old Grand Cru cellar archives',
    slug: 'chateau-de-la-vigne-bordeaux',
    cuisine: 'Modern Bordelaise & Classical French',
    michelinStars: 3,
    awards: ['3 Michelin Stars 2024', 'World’s Best Wine Restaurant 2023', 'Historic Heritage Landmark'],
    priceRange: '$$$$',
    pricePerPerson: 360,
    neighborhood: 'Saint-Émilion',
    city: 'Bordeaux',
    country: 'France',
    address: 'Route des Grands Crus 12, 33330 Saint-Émilion, France',
    lat: 44.8944,
    lng: -0.1558,
    rating: 4.98,
    reviewCount: 490,
    heroImage: 'assets/asset-53.webp',
    gallery: [
      'assets/asset-16.webp',
      'assets/asset-19.webp',
      'assets/asset-08.webp'
    ],
    ambienceTags: ['Vineyard View', 'Limestone Underground Cellars', 'Sommelier Guided', 'Romantic Classical', 'Fine Art'],
    dietaryOptions: ['Vegetarian Tasting', 'Gluten-Free Accommodated'],
    featured: false,
    trendingToday: false,
    urgentTablesCount: 1,
    seatingAreas: [
      {
        id: 'limestone-vault',
        name: 'Historic 1750 Limestone Crypt Table',
        description: 'Surrounded by limestone arches carved in 1750 and library bottles from 1900.',
        priceExtra: 80,
        minParty: 2,
        maxParty: 8,
        iconName: 'Wine',
        isExclusive: true,
        photoUrl: 'assets/asset-03.webp'
      },
      {
        id: 'vineyard-orangery',
        name: 'The Glass Orangery Overlooking Vines',
        description: 'Overlooking rolling Merlot hills and sunset across Saint-Émilion.',
        priceExtra: 0,
        minParty: 2,
        maxParty: 6,
        iconName: 'Sparkles',
        photoUrl: 'assets/asset-27.webp'
      }
    ],
    tables: [
      { id: 'bx1', number: 1, name: 'Crypt Vault 01', seatingAreaId: 'limestone-vault', capacity: 4, xPercent: 30, yPercent: 40, shape: 'rect', isAvailable: true, tag: 'Cellar Sanctuary' },
      { id: 'bx2', number: 10, name: 'Orangery Table 10', seatingAreaId: 'vineyard-orangery', capacity: 4, xPercent: 70, yPercent: 40, shape: 'round', isAvailable: true, tag: 'Vineyard Horizon' }
    ],
    timeSlots: [
      { time: '12:30', meal: 'Lunch', available: true, experience: 'Sunlit Vineyard Lunch', remainingTables: 3 },
      { time: '19:30', meal: 'Dinner', available: true, experience: 'Grand Cru Heritage Tasting', remainingTables: 1, deposit: 150 }
    ],
    menus: [
      {
        category: 'Grand Cru Heritage 8-Course Tasting',
        description: 'Bordelaise game, black truffles, and vintage library reserve pairings.',
        pricePerPerson: 360,
        items: [
          {
            name: 'Pigeon de Monpazier en Croûte de Truffe',
            description: 'Roasted squab, Perigord truffle reduction, foie gras croustade.',
            price: 78,
            isSignature: true,
            pairingWine: '1995 Château Cheval Blanc Grand Cru Classé'
          }
        ]
      }
    ],
    chef: {
      name: 'Chef Camille de Ronsard',
      role: 'Head Chef & Master Sommelier',
      bio: 'Combining deep enological expertise with classic French culinary discipline.',
      photo: 'assets/asset-28.webp',
      signatureDish: 'Pigeon de Monpazier en Croûte de Truffe',
      accolades: ['3 Michelin Stars', 'Master Sommelier of France']
    },
    details: {
      dressCode: 'Formal / Elegant Attire.',
      cancellationPolicy: '48 hours cancellation policy.',
      corkagePolicy: '€100 corkage per bottle.',
      valetParking: true,
      privateDiningCapacity: 20,
      phone: '+33 5 57 24 70 00',
      email: 'reservations@chateau-vigne.fr',
      hours: [
        { days: 'Thursday - Sunday', lunch: '12:00 - 15:00', dinner: '19:00 - 23:00' }
      ]
    },
    reviews: [
      {
        id: 'rev-7',
        dinerName: 'Baron Henri de Rothschild',
        dinerCity: 'Bordeaux',
        avatar: 'assets/asset-31.webp',
        isVerifiedVIP: true,
        date: 'August 10, 2026',
        rating: 5.0,
        foodRating: 5.0,
        serviceRating: 5.0,
        ambienceRating: 5.0,
        wineRating: 5.0,
        comment: 'Une expérience extraordinaire. The 1995 Cheval Blanc poured in the 1750 limestone crypt is a memory for a lifetime.',
        experiencedDish: 'Pigeon en Croûte de Truffe'
      }
    ]
  }
];

const INITIAL_RESERVATIONS = [
  {
    id: 'res-init-1',
    confirmationCode: 'AURA-8842-NYC',
    restaurantId: 'rest-lumina-nyc',
    restaurantName: 'L’Aura Élégante',
    restaurantCity: 'New York',
    restaurantNeighborhood: 'Hudson Yards, 64th Floor',
    restaurantImage: 'assets/asset-27.webp',
    restaurantAddress: '500 W 33rd St, 64th Floor, New York, NY 10001',
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    time: '19:15',
    guests: 2,
    seatingAreaName: 'Skyline Panorama Booth',
    seatingAreaId: 'skyline-window',
    tableNumber: 10,
    guestInfo: {
      fullName: 'Alexander Sterling',
      email: 'a.sterling@reserve-vip.com',
      phone: '+1 (555) 234-8900',
      occasion: 'Anniversary Dinner',
      specialRequests: 'Window banquette with direct Hudson River sunset view. Chilled Dom Pérignon ready on table.',
      dietaryRestrictions: 'Pescatarian, No shellfish for guest 2',
      winePairingAdded: true,
      champagneOnArrival: true,
      preferredSeatingAreaId: 'skyline-window'
    },
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    totalEstimatedSpend: 980,
    depositPaid: 150,
    qrCodeSeed: 'STACKLY-8842-CONFIRMED-VIP'
  },
  {
    id: 'res-init-2',
    confirmationCode: 'STACKLY-5120-TKY',
    restaurantId: 'rest-omakase-shibata',
    restaurantName: 'Sushi Shibata Ginza',
    restaurantCity: 'Tokyo',
    restaurantNeighborhood: 'Ginza 6-Chome',
    restaurantImage: 'assets/asset-36.webp',
    restaurantAddress: '6-10-1 Ginza, Chuo City, Tokyo 104-0061',
    date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    time: '20:00',
    guests: 2,
    seatingAreaName: 'Hinoki Master Counter (8-Seat Private)',
    seatingAreaId: 'hinoki-counter',
    tableNumber: 4,
    guestInfo: {
      fullName: 'Alexander Sterling',
      email: 'a.sterling@stackly.com',
      phone: '+1 (555) 234-8900',
      occasion: 'Culinary Tour',
      specialRequests: 'Seasonal Hokkaido Uni and Grand Cru Junmai Daiginjo pairing requested.',
      dietaryRestrictions: 'No wasabi for guest 1',
      winePairingAdded: true,
      champagneOnArrival: false,
      preferredSeatingAreaId: 'hinoki-counter'
    },
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    totalEstimatedSpend: 1100,
    depositPaid: 200,
    qrCodeSeed: 'STACKLY-5120-CONFIRMED-VIP'
  }
];

if (typeof window !== 'undefined') {
  window.DEMO_USERS = typeof DEMO_USERS !== 'undefined' ? DEMO_USERS : null;
  window.EXPERIENCES_DATA = typeof EXPERIENCES_DATA !== 'undefined' ? EXPERIENCES_DATA : null;
  window.RESTAURANTS_DATA = typeof RESTAURANTS_DATA !== 'undefined' ? RESTAURANTS_DATA : null;
  window.INITIAL_RESERVATIONS = typeof INITIAL_RESERVATIONS !== 'undefined' ? INITIAL_RESERVATIONS : null;
}
