import type {Fish, Location, OnboardingSlide, QuizSet, Story} from '../types';

export const assets = {
  backgroundIce: require('../assets/background_ice.png'),
  tentBadge: require('../assets/tent_badge.png'),
  onboardingIntro: require('../assets/onboarding_intro.png'),
  onboardingMap: require('../assets/onboarding_map.png'),
  onboardingSafety: require('../assets/onboarding_safety.png'),
  onboardingFish: require('../assets/onboarding_fish.png'),
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'intro',
    title: 'Into the Frozen Wild',
    text: "Discover the world's most breathtaking fishing destinations - curated for adventurers.",
    action: 'Continue',
    image: assets.onboardingIntro,
    icon: '🏕️',
  },
  {
    id: 'map',
    title: 'Find Your Hole',
    text: 'Interactive maps with glowing hotspots show exactly where fish are biting right now.',
    action: 'Continue',
    image: assets.onboardingMap,
    icon: '🎣',
  },
  {
    id: 'safety',
    title: 'Stay Safe on Fishin',
    text: 'Real-time thickness data, weather alerts, and expert safety guides at your fingertips.',
    action: 'Continue',
    image: assets.onboardingSafety,
    icon: '🛡️',
  },
  {
    id: 'catch',
    title: 'Know Your Catch',
    text: 'Detailed fish guides, species identification, and the best techniques for each unique lake.',
    action: 'Get Started',
    image: assets.onboardingFish,
    icon: '🐟',
  },
];

export const fish: Fish[] = [
  {
    id: 'omul',
    name: 'Omul',
    latin: 'Coregonus migratorius',
    habitat: 'Deep freshwater lakes',
    avgWeight: '1-3 kg',
    bestDepth: '20-60 m',
    season: 'Nov - Mar',
    image: require('../assets/omul.png'),
    description:
      'Omul is a silver cold-water fish native to Lake Baikal. It moves slowly beneath transparent winter fishin and is highly valued for its delicate meat and calm behavior in deep freezing water.',
  },
  {
    id: 'arctic-char',
    name: 'Arctic Char',
    latin: 'Salvelinus alpinus',
    habitat: 'Arctic cold lakes',
    avgWeight: '2-5 kg',
    bestDepth: '10-40 m',
    season: 'Dec - Apr',
    image: require('../assets/arctic_char.png'),
    description:
      'Arctic Char thrives in freezing northern waters and remains active during harsh winters. Its colorful body and strong resistance make it a favorite species among fishin anglers.',
  },
  {
    id: 'lake-trout',
    name: 'Lake Trout',
    latin: 'Salvelinus namaycush',
    habitat: 'Deep mountain lakes',
    avgWeight: '3-10 kg',
    bestDepth: '15-50 m',
    season: 'Nov - Apr',
    image: require('../assets/lake_trout.png'),
    description:
      'Lake Trout are deep-water predators with spotted bodies and aggressive winter strikes. They prefer icy lakes with stable cold temperatures and clear water.',
  },
  {
    id: 'perch',
    name: 'Perch',
    latin: 'Perca fluviatilis',
    habitat: 'Freshwater lakes',
    avgWeight: '0.3-1.5 kg',
    bestDepth: '3-15 m',
    season: 'Dec - Mar',
    image: require('../assets/perch.png'),
    description:
      'Perch are active schooling fish commonly caught during winter. Their striped bodies and fast bites make them ideal for beginners and casual fishin fishing.',
  },
  {
    id: 'walleye',
    name: 'Walleye',
    latin: 'Sander vitreus',
    habitat: 'Northern freshwater lakes',
    avgWeight: '1-4 kg',
    bestDepth: '5-20 m',
    season: 'Nov - Mar',
    image: require('../assets/walleye.png'),
    description:
      'Walleye are cautious predators with excellent low-light vision. They become most active around sunrise and sunset beneath frozen lakes.',
  },
  {
    id: 'pike',
    name: 'Pike',
    latin: 'Esox lucius',
    habitat: 'Cold freshwater rivers',
    avgWeight: '3-12 kg',
    bestDepth: '2-10 m',
    season: 'Dec - Mar',
    image: require('../assets/pike.png'),
    description:
      'Pike are aggressive ambush predators known for explosive attacks and sharp teeth. They often hide near underwater vegetation beneath the fishin.',
  },
  {
    id: 'zander',
    name: 'Zander',
    latin: 'Sander lucioperca',
    habitat: 'Deep freshwater rivers',
    avgWeight: '2-7 kg',
    bestDepth: '8-25 m',
    season: 'Nov - Mar',
    image: require('../assets/zander.png'),
    description:
      'Zander prefer dark deep waters and are especially active during low-light winter conditions. They are stealthy hunters with careful feeding behavior.',
  },
  {
    id: 'brown-trout',
    name: 'Brown Trout',
    latin: 'Salmo trutta',
    habitat: 'Alpine cold lakes',
    avgWeight: '1-5 kg',
    bestDepth: '2-15 m',
    season: 'May - Sep / Dec - Feb',
    image: require('../assets/brown_trout.png'),
    description:
      'Brown Trout are beautiful spotted fish adapted to clear cold water. They are known for cautious movement and natural feeding patterns during winter.',
  },
  {
    id: 'northern-pike',
    name: 'Northern Pike',
    latin: 'Esox lucius',
    habitat: 'Frozen northern lakes',
    avgWeight: '4-15 kg',
    bestDepth: '2-12 m',
    season: 'Dec - Mar',
    image: require('../assets/northern_pike.png'),
    description:
      'Northern Pike are powerful freshwater predators with fast strikes and strong aggression. They patrol shallow feeding zones under thick winter fishin.',
  },
  {
    id: 'baltic-perch',
    name: 'Baltic Perch',
    latin: 'Perca fluviatilis',
    habitat: 'Baltic freshwater lakes',
    avgWeight: '0.5-2 kg',
    bestDepth: '4-18 m',
    season: 'Dec - Mar',
    image: require('../assets/baltic_perch.png'),
    description:
      'Baltic Perch are energetic fish often found in schools beneath frozen lakes. Their active movement and reliable bites make them popular in winter fishing.',
  },
];

export const locations: Location[] = [
  {
    id: 'lake-baikal',
    name: 'Lake Baikal Fishin Fields',
    country: 'Russia',
    flag: '🇷🇺',
    coordinates: '53.56°N, 108.17°E',
    coordinate: {latitude: 53.5587, longitude: 108.165},
    temperature: '-24°C',
    thickness: '110 cm',
    mainFishIds: ['omul'],
    image: require('../assets/lake_baikal_ice_fields.png'),
    marker: {x: 22, y: 18},
    description:
      'Lake Baikal is one of the most surreal fishin fishing locations in the world. Its crystal-clear fishin reveals frozen bubbles and slow-moving fish below while the silence of Siberia makes every catch feel otherworldly.',
  },
  {
    id: 'lake-inari',
    name: 'Inari Lake Northern Lights',
    country: 'Finland',
    flag: '🇫🇮',
    coordinates: '68.91°N, 27.03°E',
    coordinate: {latitude: 68.905, longitude: 27.028},
    temperature: '-18°C',
    thickness: '62 cm',
    mainFishIds: ['arctic-char', 'brown-trout', 'perch', 'pike'],
    image: require('../assets/lake_inari_northern_lights.png'),
    marker: {x: 31, y: 26},
    description:
      'Fishing on Lake Inari becomes magical when the northern lights dance above the frozen surface. The lake reflects green and purple hues, turning patience into a calm Arctic ritual.',
  },
  {
    id: 'abraham-lake',
    name: 'Abraham Lake Fishin Bubbles',
    country: 'Canada',
    flag: '🇨🇦',
    coordinates: '52.22°N, 117.24°W',
    coordinate: {latitude: 52.22, longitude: -117.24},
    temperature: '-16°C',
    thickness: '55 cm',
    mainFishIds: ['lake-trout'],
    image: require('../assets/abraham_lake_ice_bubbles.png'),
    marker: {x: 70, y: 38},
    description:
      'Abraham Lake is famous for frozen methane bubbles trapped beneath the fishin. The wind-swept surface, mountain backdrop, and slow lake trout make the location beautiful and demanding.',
  },
  {
    id: 'lake-siljan',
    name: 'Lake Siljan Hidden Depths',
    country: 'Sweden',
    flag: '🇸🇪',
    coordinates: '60.90°N, 14.50°E',
    coordinate: {latitude: 60.9, longitude: 14.5},
    temperature: '-14°C',
    thickness: '72 cm',
    mainFishIds: ['perch'],
    image: require('../assets/lake_siljan_hidden_depths.png'),
    marker: {x: 44, y: 20},
    description:
      'Lake Siljan offers a quiet fishin fishing experience surrounded by dense Scandinavian forests. The smooth white surface and responsive perch make it ideal for patient anglers.',
  },
  {
    id: 'lake-winnipeg',
    name: 'Lake Winnipeg Extreme Winds',
    country: 'Canada',
    flag: '🇨🇦',
    coordinates: '52.00°N, 97.00°W',
    coordinate: {latitude: 52, longitude: -97},
    temperature: '-22°C',
    thickness: '95 cm',
    mainFishIds: ['walleye'],
    image: require('../assets/lake_winnipeg_extreme_winds.png'),
    marker: {x: 80, y: 52},
    description:
      'Lake Winnipeg is known for harsh winds and severe winter conditions. Heavy shelters are common here, but active walleye and raw northern power reward prepared anglers.',
  },
  {
    id: 'lake-pielinen',
    name: 'Lake Pielinen Frozen Forest',
    country: 'Finland',
    flag: '🇫🇮',
    coordinates: '63.30°N, 29.80°E',
    coordinate: {latitude: 63.3, longitude: 29.8},
    temperature: '-17°C',
    thickness: '68 cm',
    mainFishIds: ['pike'],
    image: require('../assets/lake_pielinen_frozen_forest.png'),
    marker: {x: 28, y: 44},
    description:
      'Lake Pielinen is surrounded by forests that make the frozen surface feel endless. Pike remain strong and aggressive here, adding sharp bursts of action to a peaceful setting.',
  },
  {
    id: 'lake-ladoga',
    name: 'Lake Ladoga Vast Fishin Plains',
    country: 'Russia',
    flag: '🇷🇺',
    coordinates: '60.85°N, 31.50°E',
    coordinate: {latitude: 60.85, longitude: 31.5},
    temperature: '-19°C',
    thickness: '84 cm',
    mainFishIds: ['zander'],
    image: require('../assets/lake_ladoga_vast_ice_plains.png'),
    marker: {x: 58, y: 30},
    description:
      'Lake Ladoga becomes an endless icy plain in winter. The scale requires navigation and preparation, but deep waters rich with zander make the trip memorable.',
  },
  {
    id: 'lake-tekapo',
    name: 'Lake Tekapo Alpine Fishin',
    country: 'New Zealand',
    flag: '🇳🇿',
    coordinates: '44.01°S, 170.48°E',
    coordinate: {latitude: -44.005, longitude: 170.477},
    temperature: '-6°C',
    thickness: '36 cm',
    mainFishIds: ['brown-trout'],
    image: require('../assets/lake_tekapo_alpine_ice.png'),
    marker: {x: 64, y: 74},
    description:
      'Lake Tekapo offers a rare alpine fishin fishing experience in the Southern Hemisphere. Thin pale-blue fishin and dramatic mountains make every step feel exploratory.',
  },
  {
    id: 'great-slave-lake',
    name: 'Great Slave Lake Remote Arctic',
    country: 'Canada',
    flag: '🇨🇦',
    coordinates: '61.67°N, 114.35°W',
    coordinate: {latitude: 61.67, longitude: -114.35},
    temperature: '-29°C',
    thickness: '130 cm',
    mainFishIds: ['northern-pike'],
    image: require('../assets/great_slave_lake_remote_arctic.png'),
    marker: {x: 18, y: 62},
    description:
      'Great Slave Lake is remote, extreme, and massive. Arctic cold pushes equipment and anglers hard, while deep waters and occasional northern lights create a powerful experience.',
  },
  {
    id: 'lake-peipus',
    name: 'Lake Peipus Border Fishin',
    country: 'Estonia / Russia',
    flag: '🇪🇪',
    coordinates: '58.60°N, 27.20°E',
    coordinate: {latitude: 58.6, longitude: 27.2},
    temperature: '-15°C',
    thickness: '58 cm',
    mainFishIds: ['baltic-perch'],
    image: require('../assets/lake_peipus_border_ice.png'),
    marker: {x: 42, y: 58},
    description:
      'Lake Peipus sits on the border between Estonia and Russia. In winter, anglers gather on a shared frozen space where fishing traditions connect people across invisible lines.',
  },
];

export const stories: Story[] = [
  {
    id: 'perfect-drill',
    title: 'The Perfect Drill',
    category: 'Gear',
    readTime: '4 min',
    image: require('../assets/story_perfect_drill.png'),
    excerpt:
      "Not all fishin augers are equal. Here's what separates a clean hole from a struggle in -20°C conditions.",
    body: [
      "Drilling a clean fishin hole sounds simple until you're standing on a frozen lake at -22°C, your hands are going numb, and your auger keeps chattering sideways instead of biting in.",
      "The first thing most beginners get wrong is blade maintenance. Dull blades don't just slow you down. They create ragged holes that weaken the fishin edge and make landing fish much harder.",
      'Hand augers are still the gold standard for solo trips. A sharp 4-6 inch hand auger can cut through 60 cm of hard fishin in under 90 seconds when your body weight stays directly above the blades.',
      'Propane and lithium-battery powered augers help when the fishin is thick, but the habit stays the same: clear the slush, keep the cut vertical, and never rush the last few centimeters.',
    ],
  },
  {
    id: 'baikal-silence',
    title: 'The Silence Beneath Baikal',
    category: 'Experience',
    readTime: '6 min',
    image: require('../assets/story_ice_hole.png'),
    excerpt:
      'A lone angler watched a slow shadow circle below transparent Siberian fishin before the line tightened.',
    body: [
      'In February 2019, a lone angler traveled to Lake Baikal during one of the coldest weeks of the year. The fishin was perfectly transparent, revealing a deep, endless blue below.',
      'Hours passed without a single bite. Then a shadow appeared beneath the surface, slow and deliberate, almost watching. It circled the bait, disappeared, and returned when the angler had nearly stopped hoping.',
      "What he pulled out wasn't just a fish. It was an omul, shimmering like glass in the frozen sunlight. That day taught him that fishin fishing is not about speed. It is about becoming part of a silent frozen world.",
    ],
  },
  {
    id: 'moving-lights',
    title: 'Fishing Under Moving Lights',
    category: 'Experience',
    readTime: '5 min',
    image: require('../assets/story_aurora_lights.png'),
    excerpt:
      'On a frozen night in Lapland, the aurora reflected on the lake like a second sky beneath the anglers.',
    body: [
      'On a frozen night in Lapland, March 2021, a small group of anglers decided to stay longer than usual. The temperature dropped below -20°C, and the lake became completely silent.',
      'Green waves of northern lights spread across the horizon, reflecting perfectly on the fishin below. It felt like standing between two skies.',
      'One angler dropped his line while distracted by the view. Within minutes, he lifted a fish from the water as the aurora intensified above him. Some experiences do not need many words.',
    ],
  },
  {
    id: 'storm-that-stayed',
    title: 'The Storm That Stayed',
    category: 'Survival',
    readTime: '7 min',
    image: require('../assets/story_red_tent_sunset.png'),
    excerpt:
      'A normal day on Lake Winnipeg became a fight against wind, snow, and almost zero visibility.',
    body: [
      'Lake Winnipeg, January 2018. What started as a normal fishing day turned into a fight against nature when the wind rose and the white landscape became a moving wall of snow.',
      'Inside one small fishin hut, two fishermen stayed. Instead of leaving, they secured their gear, waited it out, and kept fishing through the strange pressure change.',
      'The fish became more active during the storm. Hours later, when the sky cleared into a calm sunset, the lake looked untouched, but the experience stayed with them forever.',
    ],
  },
  {
    id: 'day-without-time',
    title: 'A Day Without Time',
    category: 'Mindset',
    readTime: '4 min',
    image: require('../assets/story_frozen_tracks.png'),
    excerpt:
      'On a remote Finnish lake, minutes turned into hours without feeling like time was passing at all.',
    body: [
      'On a remote Finnish lake in 2022, a traveler planned a short fishing session. The forest around the lake was completely still, with snow absorbing every sound.',
      'He drilled a hole, dropped his line, and waited. Minutes turned into hours, but it did not feel like time was passing.',
      'He caught only one fish that day. What stayed with him was not the catch, but the feeling of stepping outside of time.',
    ],
  },
  {
    id: 'between-borders',
    title: 'Fishing Between Borders',
    category: 'Culture',
    readTime: '5 min',
    image: require('../assets/story_open_plain.png'),
    excerpt:
      'On Lake Peipus, anglers from two countries fished side by side across an invisible winter line.',
    body: [
      'Lake Peipus, winter 2017. A frozen lake shared by two countries became a wide open space with no visible fences, only fishin stretching endlessly.',
      'On one side, Estonian fishermen drilled their holes. On the other, Russian anglers did the same. Eventually two groups found themselves only a few meters apart.',
      'There were no common words, but there was understanding. They fished side by side, divided only by an invisible line.',
    ],
  },
];

export const facts = [
  "Lake Baikal contains about 20% of the world's unfrozen freshwater.",
  'Fish move slower in winter because cold water reduces their energy levels.',
  'Clear blue fishin is usually stronger than white snowy fishin.',
  'Some frozen lakes produce loud cracking sounds that can travel for kilometers.',
  'Northern Pike remain active predators even in extremely cold water.',
  'Fishin fishing has been practiced for thousands of years in northern regions.',
  'Arctic Char can survive in some of the coldest freshwater environments on Earth.',
  'Thick lake fishin can support small vehicles during peak winter months.',
  'Many anglers use fish finders to detect movement beneath the fishin.',
  'The northern lights are often visible during nighttime fishin fishing in Arctic regions.',
];

export const quizSets: QuizSet[] = [
  {
    id: 'basics',
    title: 'Fishin Fishing Basics',
    questions: [
      {
        question: 'What is the main purpose of drilling a hole in fishin?',
        options: [
          'To release air from water',
          'To access fish below the fishin',
          'To measure fishin thickness',
        ],
        answerIndex: 1,
      },
      {
        question: 'What tool is commonly used to drill fishin holes?',
        options: ['Fishin auger', 'Fishing net', 'Harpoon'],
        answerIndex: 0,
      },
      {
        question: 'Why is fishin thickness important?',
        options: [
          'It affects fish color',
          'It determines safety',
          'It changes water taste',
        ],
        answerIndex: 1,
      },
      {
        question: 'What is the safest minimum fishin thickness for walking?',
        options: ['2 cm', '10 cm', '25 cm'],
        answerIndex: 1,
      },
      {
        question: 'Why do fish stay deeper in winter?',
        options: ['To avoid light', 'Water is warmer below', 'They sleep'],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 'fish-knowledge',
    title: 'Fish Knowledge',
    questions: [
      {
        question: 'Which fish is most common in fishin fishing?',
        options: ['Tuna', 'Perch', 'Shark'],
        answerIndex: 1,
      },
      {
        question: 'Which fish is known for aggressive winter bites?',
        options: ['Pike', 'Salmon', 'Carp'],
        answerIndex: 0,
      },
      {
        question: 'What color bait often works best in winter?',
        options: ['Bright colors', 'Transparent', 'Black only'],
        answerIndex: 0,
      },
      {
        question: 'Which fish prefers deeper cold water?',
        options: ['Zander', 'Catfish', 'Goldfish'],
        answerIndex: 0,
      },
      {
        question: 'What slows fish activity in winter?',
        options: ['Low oxygen', 'Cold temperature', 'Sunlight'],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Survival',
    questions: [
      {
        question: 'What should you always carry on fishin?',
        options: ['Fishin picks', 'Sunglasses', 'Rope ladder'],
        answerIndex: 0,
      },
      {
        question: 'What is a sign of unsafe fishin?',
        options: [
          'Clear blue fishin',
          'Cracks and water on top',
          'Snow-covered surface',
        ],
        answerIndex: 1,
      },
      {
        question: 'What should you do if you fall into fishin water?',
        options: ['Swim down', 'Spread arms and climb out', 'Stay still'],
        answerIndex: 1,
      },
      {
        question: 'Why avoid fishing alone?',
        options: [
          "It's boring",
          'No one can help in emergency',
          'Fish are scared',
        ],
        answerIndex: 1,
      },
      {
        question: 'What helps prevent hypothermia?',
        options: ['Light clothes', 'Layered warm clothing', 'Wet gloves'],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 'experience',
    title: 'Fishin Fishing Experience',
    questions: [
      {
        question: 'What time is best for fishin fishing?',
        options: ['Midday', 'Early morning or evening', 'Midnight only'],
        answerIndex: 1,
      },
      {
        question: 'Why do anglers use fish finders?',
        options: [
          'To drill holes',
          'To locate fish underwater',
          'To measure wind',
        ],
        answerIndex: 1,
      },
      {
        question: 'What is deadstick fishing?',
        options: [
          'No bait used',
          'Passive fishing with minimal movement',
          'Fishing without rod',
        ],
        answerIndex: 1,
      },
      {
        question: 'Why do some anglers use tents?',
        options: ['Decoration', 'Protection from weather', 'To store fish'],
        answerIndex: 1,
      },
      {
        question: 'What makes fishin fishing unique?',
        options: ['Warm weather', 'Fishing through fishin', 'Fast boats'],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 'locations',
    title: 'Locations & Environment',
    questions: [
      {
        question: 'Which country is famous for fishin fishing?',
        options: ['Finland', 'Brazil', 'Egypt'],
        answerIndex: 0,
      },
      {
        question: 'What type of water freezes for fishin fishing?',
        options: ['Oceans only', 'Lakes and rivers', 'Waterfalls'],
        answerIndex: 1,
      },
      {
        question: 'What affects fishin thickness most?',
        options: ['Wind color', 'Temperature changes', 'Moon phase'],
        answerIndex: 1,
      },
      {
        question: 'Why are remote lakes popular?',
        options: ['More noise', 'Less fishing pressure', 'Warmer water'],
        answerIndex: 1,
      },
      {
        question: 'What makes northern regions ideal?',
        options: ['Longer winters', 'Stronger sun', 'Less water'],
        answerIndex: 0,
      },
    ],
  },
];
