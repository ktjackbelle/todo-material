'use strict';

var path = require('path');

module.exports = {
  context: __dirname,
  entry: './app',
  devtool: 'sourcemap',
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
};
