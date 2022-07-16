/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    colors: {
      white: '#FFF',
      primary: '#28404A',
      black: {
        50: '#323A43',
        100: '#000',
        200: '#060606',
        300: '#292521',
        400: '#1C1E2D',
        500: '#11052E'
      },
      gray: {
        100: '#B5B5B5',
        200: '#767575'
      }
    },
    extend: {}
  },
  plugins: []
};
