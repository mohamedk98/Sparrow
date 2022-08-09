/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode:'class',
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
        darkBgColor:'#22303C',
        darkBgSideBar:'#192734',
       

      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('tailwind-scrollbar-hide'),
  ],
};
