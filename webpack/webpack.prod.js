const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const ENV = 'production';

module.exports = options => merge(commonConfig({env: ENV}), {
  mode: ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.css$/,
        loader: 'stripcomment-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_API_URL: JSON.stringify('http://localhost:4000/api')
      }
    }),
    new CleanWebpackPlugin()
  ]
})
;
