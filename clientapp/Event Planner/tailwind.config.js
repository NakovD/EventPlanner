/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'text-light': '#082614',
      'background-light': '#ededed',
      'primary-light': '#e9494f',
      'secondary-light': '#ffffff',
      'accent-light': '#e63339',
      'text-dark': '#f7f7fd',
      'background-dark': '#04040c',
      'primary-dark': '#5a2a83',
      'secondary-dark': '#230b22',
      'accent-dark': '#832a80',
      'light-blue': '#5887FF',
      'shadow-color': 'black',
      transparent: 'transparent',
    },
    extend: {},
  },
  plugins: [],
};
