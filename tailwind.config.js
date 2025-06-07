module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.js'],
  theme: {
    extend: {
      animation: {
        'gradient-angle-rotate': 'gradient-angle-rotate 4s linear infinite',
        'fade-in': 'fade-in 200ms linear',
      },
      keyframes: {
        'gradient-angle-rotate': {
          from: {
            '--gradient-angle': '0deg',
          },
          to: {
            '--gradient-angle': '360deg',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(25px)',
          },
          to: {
            opacity: '1',
          },
        },
      },
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
