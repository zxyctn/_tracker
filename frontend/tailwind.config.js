/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#00FFB2',
          secondary: '#FFE500',
          accent: '#FF00E5',
          neutral: '#BFFFEC',
          'base-100': '#000000',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
