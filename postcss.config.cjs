// postcss.config.cjs
module.exports = {
  plugins: {
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'? { cssnano: {} } : {})
  },
};
