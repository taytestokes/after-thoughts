const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/pages/**/*.js', './src/components/**/*.js'],
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
        gray: colors.zinc,
      },
    },
  },
  plugins: [],
}
