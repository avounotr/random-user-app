const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const Config = require('./app/config/config');
const publicPath = `${Config.publicPath}/`;

module.exports= {
  entry: {
    index: [path.join(__dirname, 'app/src/index.jsx')],
  },
  output: {
    path: path.join(__dirname, '/dist-prod'),
    filename: '[name]-[hash].min.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RandomUsers',
      filename: 'index.html',
      template: './app/views/default.tpl.html',
      inject: 'body',
    }),
    new webpack.optimize.UglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, 'dist-prod/cached_unglify'),
      debug: false,
      minimize: true,
      sourceMap: true,
      mangle: true,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: false,
      },
    }),
    new StatsPlugin('webpack.stats.json', { source: false, modules: false }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new Visualizer({ filename: './statistics.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(jpe|jpg|gif|svg)(\?.*$|$)/,
        loader: 'url-loader?limit=100000&name=[name].ext',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.svg'],
  }
};
