const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  module: {
    rules: [
        { test: /\.css$/, use: ['style-loader','css-loader'], include: [/src/, /node_modules/] }, 
        { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/,
          query: { presets: ['es2015', 'react', 'stage-2'] }
        }, 
        { test: /\.json$/, loader: 'json-loader', include: '/build/contracts/'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  node: {
    fs: 'empty'
  },
  mode: "development"
};