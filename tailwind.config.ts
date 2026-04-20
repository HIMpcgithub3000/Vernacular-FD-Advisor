import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E07B00',
        secondary: '#2D2B6B',
        surface: '#FFFFFF',
        bg: '#FFFBF5',
        success: '#1A7A4A',
        muted: '#6B6460',
      },
      fontFamily: {
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
        ui: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
