const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = merge(common,{
  mode: 'production',

  devtool: false,

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js'
  },


  module: {
    rules: [
       {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 0,
      minRatio: 0.8
    })
  ],

  optimization: {
    minimize: true,
    nodeEnv: 'production',
    concatenateModules: true,
    minimizer: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 0,
        minRatio: 0.8
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 600000
    }
  },

  performance: {
    hints: false,
    maxEntrypointSize: 312000,
    maxAssetSize: 312000
  }

})