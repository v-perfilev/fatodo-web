const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const PATH = require('path');
const ENV = 'development';

module.exports = () => merge(commonConfig({env: ENV}), {
  mode: ENV,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: PATH.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|ts)x?$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('http://localhost:9000'),
        API_URL: JSON.stringify('http://localhost:4000/api'),
        SOCIAL_LOGIN: true,
        DEVELOPMENT_MODE: true
      }
    })
  ]
});
