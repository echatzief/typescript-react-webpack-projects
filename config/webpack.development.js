const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common,{
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    compress: true,
    publicPath: '/',
    hot: true,
    port: 5000
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
    new webpack.HotModuleReplacementPlugin()
  ],

  performance: {
    maxEntrypointSize: 312000,
    maxAssetSize: 312000
  }
})