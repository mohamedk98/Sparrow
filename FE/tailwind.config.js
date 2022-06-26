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
          green: '#42b72a',
        },
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
