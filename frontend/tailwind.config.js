/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
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
};
