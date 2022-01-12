module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '560px',
        lg: '720px',
        xl: '900px',
        '2xl': '900px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
