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
    id: 'hanshan-entrance',
    name: '寒山寺-入口照壁',
    title: '黄墙绿树，千年古刹之始',
    description: '标志性的黄色照壁，写有“南无阿弥陀佛”，是游客进入景区的必经之处，也是绝佳的合影点。',
    history: '作为寒山寺的守护屏障，照壁不仅是空间上的划分，更象征着从闹市进入禅门的心境转换。',
    image: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1549487532-689883655187?q=80&w=800', 
    type: 'gate',
    coordinates: { x: 75, y: 30 }
  },
  {
    id: 'hanshan-hall',
    name: '大雄宝殿',
    title: '寒山古寺的建筑枢纽',
    description: '寒山寺的核心建筑，殿内供奉释迦牟尼佛，香火极旺。梁架结构精巧，尽显古建筑之美。',
    history: '历经多次毁坏与重建，现存建筑多为清代风格，但基座仍保留了古建的神韵。',
    image: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1558231922-ca6a469f37c3?q=80&w=800', 
    type: 'temple',
    coordinates: { x: 78, y: 25 }
  },
  {
    id: 'hanshan-noodles',
    name: '寒山素斋面馆',
    title: '“姑苏一碗面”的禅意滋味',
    description: '位于寺庙配殿，这里的苏式素面（如罗汉净素面）是许多香客和当地人的必吃。',
    history: '苏州人讲究“不时不食”，寒山素斋用最朴素的菌菇、竹笋，熬出最顶级的鲜味。',
    image: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800', 
    type: 'canal',
    coordinates: { x: 82, y: 28 }
  },
  {
    id: 'maple-bridge-spot',
    name: '枫桥',
    title: '古诗里的那座石拱桥',
    description: '横跨在古运河支流上的单孔石拱桥，与江村桥遥遥相对。张继当时就是在桥下的船里听到了钟声。',
    history: '原名“封桥”，因古时夜间封锁水道得名，因《枫桥夜泊》而改为现名。',
    poetry: {
      text: '月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。',
      author: '张继 (唐)',
      translation: '月亮落下，乌鸦啼叫，寒霜满天；江边的枫树与渔火对着忧愁的思绪。'
    },
    image: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1518063717166-41f23788a101?q=80&w=800', 
    type: 'bridge',
    coordinates: { x: 50, y: 45 }
  },
  {
    id: 'tieling-pass',
    name: '铁铃关',
    title: '运河畔的抗倭古隘',
    description: '紧邻枫桥，是苏州现存唯一的抗倭关隘建筑，典型的明代城楼风格。',
    history: '公元1557年为抵御倭寇骚扰而建，曾是扼守运河水陆交通的咽喉要道。',
    image: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1596468138834-8c83060c5a31?q=80&w=800', 
    type: 'gate',
    coordinates: { x: 45, y: 40 }
  },
  {
    id: 'ancient-canal',
    name: '古运河 (护城河)',
    title: '流淌千年的黄金水道',
    description: '护城河与京杭大运河在此交汇，波光粼粼。晚上可以看到现代灯光与古桥交织的夜景。',
    history: '这里是苏州水路的枢纽，曾经商贾云集，是当年进入苏州城的“水上大门”。',
    image: 'https://images.weserv.nl/?url=images.unsplash.com/photo-1520633917882-965768007a5f?q=80&w=800', 
    type: 'canal',
    coordinates: { x: 30, y: 60 }
  }
];

export const ROUTES: Route[] = [
  {
    id: 'temple-deep',
    name: '寒山寻禅之旅',
    description: '深入寒山寺内部，体验从入口照壁到主殿香火，最受游客欢迎的经典路线。',
    stops: ['hanshan-entrance', 'hanshan-hall', 'hanshan-noodles'],
    duration: '60 min'
  },
  {
    id: 'poetry-path',
    name: '《枫桥夜泊》寻踪',
    description: '追随张继的笔触，从大运河水岸到石拱枫桥，最后停留在寒山寺外。',
    stops: ['ancient-canal', 'maple-bridge-spot', 'tieling-pass', 'hanshan-entrance'],
    duration: '45 min'
  },
  {
    id: 'defensive-route',
    name: '运河古关探秘',
    description: '聚焦苏州古城的防御历史，游览大运河与现存抗倭遗迹铁铃关。',
    stops: ['ancient-canal', 'tieling-pass', 'maple-bridge-spot'],
    duration: '30 min'
  }
];
