const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const PATH = require('path');
const ENV = 'development';

module.exports = options => merge(commonConfig({env: ENV}), {
  mode: ENV,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: PATH.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_API_URL: JSON.stringify('http://localhost:4000/api')
      }
    })
  ]
});
