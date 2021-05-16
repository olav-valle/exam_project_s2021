
// uses the tailwindcss-children plugin for child selector variants:
// https://github.com/benface/tailwindcss-children

const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      DEFAULT: '0 2px 8px rgba(0, 0, 0, 0.26)',
      orange:  '0 2px 12px rgba(252, 163, 17, 1)'
    },
    extend: {
      gridTemplateRows: {
        'itemCardLink': '50px minmax(900px, 1fr) 100px',
      },
      transitionProperty: {
        'width': 'width',
        'shadow': 'shadow'
      }
    },
    colors: {
      yellow: {
        DEFAULT: '#FCA311',
        dark: colors.yellow["600"]
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
      boxShadow: ['hover', 'focus'],
      transitionProperty: ['hover', 'focus'],
      textColor: ['children', 'children-hover', 'hover', 'disabled'],
      margin: ['children'],
      maxWidth: ['children'],
      width: ['focus'],
      backgroundColor: ['children', 'children-hover', 'hover', 'focus', 'disabled'],
      borderColor: ['children', 'children-hover','hover', 'focus'],
      borderWidth: ['children', 'children-hover','hover', 'focus', 'disabled'],
      ringWidth: ['children', 'children-hover','hover', 'focus'],
      ringColor: ['children', 'children-hover','hover', 'focus'],
    },
  },
  plugins: [
      require('tailwindcss-children'),
  ],
}
