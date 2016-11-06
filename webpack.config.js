'use strict'

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.glsl$/,
      loader: 'raw'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'regl'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    inline: true,
    progress: true
  }
}
