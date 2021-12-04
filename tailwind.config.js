const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.js', './src/components/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        sm: '420px',
        md: '620px',
        lg: '768px',
        xl: '768px',
        '2xl': '768px',
      },
      colors: {
        ...colors,
        gray: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
