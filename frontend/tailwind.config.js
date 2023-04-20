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
          100: '#dfccff',
          200: '#d8bfff',
          300: '#c099ff',
          400: '#904dff',
          500: '#6100FF',
          600: '#5700e6',
          700: '#4900bf',
          800: '#3a0099',
          900: '#30007d',
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
          primary: '#6100FF',
          secondary: '#24FF00',
          accent: '#FF0099',
          neutral: '#D8BFFF',
          'base-100': '#FFFFFF',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
  darkMode: 'class',
};
