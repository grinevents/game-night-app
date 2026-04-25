export const COLORS = {
  red:    { bg: '#C0392B', label: 'Red' },
  orange: { bg: '#E67E22', label: 'Orange' },
  yellow: { bg: '#F1C40F', label: 'Yellow' },
  green:  { bg: '#27AE60', label: 'Green' },
  blue:   { bg: '#2980B9', label: 'Blue' },
  purple: { bg: '#8E44AD', label: 'Purple' },
};

// 35-slot weighted color pool matching the original app.
// Includes regular colors, "All Play" variants, and "Wild" options.
export const COLOR_POOL = [
  { key: 'wild',   label: 'Wild',            bg: '#222222', allPlay: false },
  { key: 'red',    label: 'Red',             bg: '#C0392B', allPlay: false },
  { key: 'orange', label: 'Orange All Play', bg: '#E67E22', allPlay: true  },
  { key: 'yellow', label: 'Yellow',          bg: '#F1C40F', allPlay: false },
  { key: 'green',  label: 'Green All Play',  bg: '#27AE60', allPlay: true  },
  { key: 'blue',   label: 'Blue',            bg: '#2980B9', allPlay: false },
  { key: 'purple', label: 'Purple All Play', bg: '#8E44AD', allPlay: true  },
  { key: 'red',    label: 'Red',             bg: '#C0392B', allPlay: false },
  { key: 'orange', label: 'Orange',          bg: '#E67E22', allPlay: false },
  { key: 'yellow', label: 'Yellow All Play', bg: '#F1C40F', allPlay: true  },
  { key: 'green',  label: 'Green',           bg: '#27AE60', allPlay: false },
  { key: 'blue',   label: 'Blue All Play',   bg: '#2980B9', allPlay: true  },
  { key: 'purple', label: 'Purple',          bg: '#8E44AD', allPlay: false },
  { key: 'wild',   label: 'Wild',            bg: '#222222', allPlay: false },
  { key: 'red',    label: 'Red All Play',    bg: '#C0392B', allPlay: true  },
  { key: 'orange', label: 'Orange',          bg: '#E67E22', allPlay: false },
  { key: 'yellow', label: 'Yellow',          bg: '#F1C40F', allPlay: false },
  { key: 'wild',   label: 'Wild All Play',   bg: '#222222', allPlay: true  },
  { key: 'green',  label: 'Green',           bg: '#27AE60', allPlay: false },
  { key: 'blue',   label: 'Blue',            bg: '#2980B9', allPlay: false },
  { key: 'purple', label: 'Purple',          bg: '#8E44AD', allPlay: false },
  { key: 'wild',   label: 'Wild',            bg: '#222222', allPlay: false },
  { key: 'red',    label: 'Red',             bg: '#C0392B', allPlay: false },
  { key: 'orange', label: 'Orange All Play', bg: '#E67E22', allPlay: true  },
  { key: 'yellow', label: 'Yellow',          bg: '#F1C40F', allPlay: false },
  { key: 'green',  label: 'Green All Play',  bg: '#27AE60', allPlay: true  },
  { key: 'blue',   label: 'Blue All Play',   bg: '#2980B9', allPlay: true  },
  { key: 'purple', label: 'Purple',          bg: '#8E44AD', allPlay: false },
  { key: 'red',    label: 'Red All Play',    bg: '#C0392B', allPlay: true  },
  { key: 'orange', label: 'Orange',          bg: '#E67E22', allPlay: false },
  { key: 'yellow', label: 'Yellow All Play', bg: '#F1C40F', allPlay: true  },
  { key: 'green',  label: 'Green',           bg: '#27AE60', allPlay: false },
  { key: 'blue',   label: 'Blue',            bg: '#2980B9', allPlay: false },
  { key: 'purple', label: 'Purple All Play', bg: '#8E44AD', allPlay: true  },
  { key: 'wild',   label: 'Wild All Play',   bg: '#222222', allPlay: true  },
];

export function randomColor() {
  return COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];
}
