const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const CLIENT_PATH = './client';
const CLIENT_DIST_PATH = './client/dist';
const SERVER_PATH = './server';

module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: [
    CLIENT_PATH + '/src/index.js'
  ],
  output: {
    path: __dirname + "/client/dist",
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env'] }
      }
    }, {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        }
      ]
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new CopyWebpackPlugin([
      { from: CLIENT_PATH + '/style/css/*.css', to: 'style/bundle.css' },
      { from: CLIENT_PATH + '/index.html', to: 'index.html' }
    ])
  ]

};
