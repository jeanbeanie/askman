const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './client/index',
  ],
  target: 'web',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'common'),
          path.join(__dirname, 'src'),
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('client'),
      },
    }),
  ],
  devServer: {
    host: 'localhost',
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 3001,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    path: path.join(__dirname, '.build'),
    publicPath: 'http://localhost:3001/',
    filename: 'client.js',
  },
};
