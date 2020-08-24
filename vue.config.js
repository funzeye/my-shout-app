// used if using github pages with custom domain
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
}

// used if using github pages with default domain
// module.exports = {
//  publicPath: process.env.NODE_ENV === 'production'
//    ? '/nora-and-dave-get-married/'
//    : '/'
// }
