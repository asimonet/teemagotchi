export default {
  plugins: {
    'postcss-import': {},          // ← inlines your @import statements
    '@tailwindcss/postcss': {},    // ← then runs Tailwind
    autoprefixer: {},
  },
}
