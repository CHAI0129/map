export interface Spot {
  id: string;
  name: string;
  title: string;
  description: string;
  history: string;
  poetry?: {
    text: string;
    author: string;
    translation: string;
  };
  image: string;
  type: 'gate' | 'bridge' | 'temple' | 'canal';
  coordinates: { x: number; y: number };
}

export interface Route {
  id: string;
  name: string;
  description: string;
  stops: string[]; // spot ids
  duration: string;
}

export const SPOTS: Spot[] = [
  {
    id: 'maple-bridge',
    name: 'Maple Bridge (Fengqiao)',
    title: 'The Gateway to the Night Mooring',
    description: 'A historic stone arch bridge spanning the Shangtang River.',
    history: 'Built during the Tang Dynasty, this bridge served as a critical junction for the Grand Canal and inspired Zhang Ji\'s famous poem.',
    poetry: {
      text: '月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。',
      author: 'Zhang Ji (Tang Dynasty)',
      translation: 'The moon sets, a crow crows, frost fills the sky; / By maples and fishing fires, I watch the night go by. / From Hanshan Temple outside the Gusu wall, / To the traveler\'s boat, the midnight bell\'s call.'
    },
    image: 'https://images.unsplash.com/photo-1543097692-fa13c6cd8595?auto=format&fit=crop&q=80&w=800',
    type: 'bridge',
    coordinates: { x: 50, y: 55 }
  },
  {
    id: 'hanshan-temple',
    name: 'Hanshan Temple',
    title: 'Sanctuary of the Midnight Bell',
    description: 'The ancient monastery famous throughout East Asia for its peaceful vibes and heavy bell.',
    history: 'Founded in the 6th century, it was originally named Miaolita Temple but was later renamed after the eccentric monk-poet Hanshan.',
    image: 'https://images.unsplash.com/photo-1505373676834-4bc972236afb?auto=format&fit=crop&q=80&w=800',
    type: 'temple',
    coordinates: { x: 75, y: 35 }
  },
  {
    id: 'grand-canal',
    name: 'The Grand Canal',
    title: 'The Great Golden Waterway',
    description: 'The world\'s oldest and longest artificial river.',
    history: 'This section of the canal represents the height of Ming and Qing dynasty commerce, connecting the south of China to Beijing.',
    image: 'https://images.unsplash.com/photo-1520633917882-965768007a5f?auto=format&fit=crop&q=80&w=800',
    type: 'canal',
    coordinates: { x: 30, y: 70 }
  },
  {
    id: 'tie-ling-guan',
    name: 'Tieling Guan (Iron Bell Pass)',
    title: 'Guardian against Salt Pirates',
    description: 'A rare coastal defense structure situated on land.',
    history: 'Built in 1557 during the Jiajing period to protect the Grand Canal from Japanese pirates (Wokou).',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800',
    type: 'gate',
    coordinates: { x: 45, y: 40 }
  }
];

export const ROUTES: Route[] = [
  {
    id: 'quick',
    name: 'Quick Visit',
    description: 'The essential landmarks for a short stroll.',
    stops: ['maple-bridge', 'hanshan-temple'],
    duration: '20 mins'
  },
  {
    id: 'poetry',
    name: 'Poetry Route',
    description: 'Tracing the steps of Zhang Ji and the Tang poets.',
    stops: ['maple-bridge', 'hanshan-temple', 'grand-canal'],
    duration: '45 mins'
  },
  {
    id: 'canal',
    name: 'Grand Canal Route',
    description: 'Focusing on the engineering and defense of the canal.',
    stops: ['grand-canal', 'maple-bridge', 'tie-ling-guan'],
    duration: '40 mins'
  }
];
