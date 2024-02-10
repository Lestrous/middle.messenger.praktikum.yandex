module.exports = ({ env }) => ({
  map: env === 'development',
  plugins: env === 'production'
    ? {
      'cssnano': {},
      'autoprefixer': {},
    }
    : {},
});
