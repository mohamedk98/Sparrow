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
          grey:'#F2F3F5',
          greyHover:'#CCCCCC'
        },
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
