const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const PATH = require('path');
const ENV = 'development';

module.exports = () => merge(commonConfig({env: ENV}), {
  mode: ENV,
  entry: './src/index.tsx',
  output: {
    path: PATH.join(__dirname, '../dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: PATH.join(__dirname, '../dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    openPage: 'http://localhost:9000',
    disableHostCheck: true,
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
    new webpack.EnvironmentPlugin({
      SOCIAL_LOGIN: true,
      DEVELOPMENT_MODE: true,
      DEBUG_WS: false,
    })
  ]
});
