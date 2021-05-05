
// uses the tailwindcss-children plugin for child selector variants:
// https://github.com/benface/tailwindcss-children
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
      grey: '#E5E5E5',
      white: '#ffffff'

    }
  },
  variants: {
    extend: {
      textColor: ['children', 'children-hover', 'hover'],
    },
  },
  plugins: [
      require('tailwindcss-children'),
  ],
}
