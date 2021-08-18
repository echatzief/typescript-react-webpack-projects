
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {

  entry: path.resolve(__dirname, '../src/index.tsx'),
  
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/bundle-[hash].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js','.ts','.tsx','.json', '.css', '.html']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        }],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'../public/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
}