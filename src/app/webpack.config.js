'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './app',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist', 'js'),
    filename: 'app.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.html$/, loader: 'html' },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
