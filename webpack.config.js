const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'mini-2vdom.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'www'),
    compress: false,
    port: 8080,
    publicPath: '/public/'
  }
}