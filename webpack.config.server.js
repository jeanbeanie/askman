const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './server/index',
  ],
  target: 'node',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  output: {
    path: path.join(__dirname, 'server'),
    filename: 'app.js',
  },
};
