module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/parrot/'
    : '/',
  devServer: {
    https: true
  }
}
