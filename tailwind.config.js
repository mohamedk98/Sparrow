/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode:'class',
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      md1: '875px',
      // => @media (min-width: 845px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      lg1: '1260px',
      // => @media (min-width: 1260px) { ... }

      lg2: '1192px',
      // => @media (min-width: 1192px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
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
