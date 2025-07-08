// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {
      filter: (path) => !path.endsWith('.mts') && !path.endsWith('.d.mts')
    },
    tailwindcss: {},
    autoprefixer: {},
  }
}