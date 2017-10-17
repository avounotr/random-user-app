const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports= {
  devtool: 'inline-source-map',
  entry: {
    index: [path.join(__dirname, 'app/src/index.jsx')],
  },
  output: {
    path: path.join(__dirname, '/dist-dev'),
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.HotModuleReplacementPlugin(),
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
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(jpe|jpg|gif|svg|jpeg|png)(\?.*$|$)/,
        loader: 'url-loader?limit=100000&name=[name].ext',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.svg', '.jpeg', '.jpg', '.png', '.gif'],
  }
};
