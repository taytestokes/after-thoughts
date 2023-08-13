module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.js'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '560px',
        lg: '720px',
        xl: '720px',
        '2xl': '720px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
