module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.js'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '720px',
        lg: '900px',
        xl: '900px',
        '2xl': '900px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
