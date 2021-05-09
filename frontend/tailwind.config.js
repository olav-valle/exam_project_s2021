
// uses the tailwindcss-children plugin for child selector variants:
// https://github.com/benface/tailwindcss-children

const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      yellow: {
        DEFAULT: '#FCA311',
      },
      blue: {
        DEFAULT: '#14213D',
        light: '#3C64B9'
      },
      black: '#000000',
      grey: colors.gray,
      white: '#ffffff',
      green: {
        light: '#10b981',
        dark: '#00593c',
      },
      red: colors.red,



    }
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['children', 'children-hover', 'hover', 'disabled'],
      margin: ['children'],
      maxWidth: ['children'],
      ringWidth: ['children', 'focus'],
      borderWidth: ['disabled']
    },
  },
  plugins: [
      require('tailwindcss-children'),
  ],
}
