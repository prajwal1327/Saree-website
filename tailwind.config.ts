import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F2EA',
        cream: '#FBF8F3',
        espresso: '#211A17',
        burgundy: '#641F2B',
        gold: '#A88955',
        blush: '#D8B8B0',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.25em',
        wider2: '0.15em',
      },
      transitionDuration: {
        '700': '700ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [],
};

export default config;
