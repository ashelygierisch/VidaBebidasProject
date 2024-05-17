import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');
const { addDynamicIconSelectors } = require('@iconify/tailwind');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('daisyui'),
    addDynamicIconSelectors(),
    nextui({
      themes: {
        light: {
          layout: {
            foreground: '#000000',
          }, // light theme layout tokens
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            foreground: '#ffffff',
          }, // dark theme colors
        },
      },
    }),
  ],
};
export default config;
