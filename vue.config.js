// used if using github pages with custom domain
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'My Shout'
        return args
      })
  }
}

// used if using github pages with default domain
// module.exports = {
//  publicPath: process.env.NODE_ENV === 'production'
//    ? '/nora-and-dave-get-married/'
//    : '/'
// }
