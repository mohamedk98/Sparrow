/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        facebook: {
          blue: '#1877f2',
          blueHover: '#1561c5',
          green: '#42b72a',
          greenHover: '#349421db',
          grey: '#f0f2f5',
        },
      },
      spacing: {
        128: '25rem',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('tailwind-scrollbar-hide'),
  ],
};
