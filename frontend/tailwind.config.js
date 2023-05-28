/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#ccfff0',
          200: '#bfffec',
          300: '#99ffe0',
          400: '#4dffc9',
          500: '#00FFB2',
          600: '#00e6a0',
          700: '#00bf86',
          800: '#00996b',
          900: '#007d57',
        },
        light: {
          100: '#ccf5ff',
          200: '#bff2ff',
          300: '#99ebff',
          400: '#4ddbff',
          500: '#00ccff',
          600: '#00b8e6',
          700: '#0099bf',
          800: '#007a99',
          900: '#00647d',
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#00FFB2',
          secondary: '#FFE500',
          accent: '#FF00E5',
          neutral: '#BFFFEC',
          'base-100': '#000000',
        },

        light: {
          primary: '#00ccff',
          secondary: '#ff8800',
          accent: '#FF0099',
          neutral: '#c2f3ff',
          'base-100': '#FFFFFF',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
  darkMode: 'class',
};
