const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATH = require('path');
const ENV = 'production';

module.exports = (env) => merge(commonConfig({env: ENV}), {
  mode: ENV,
  entry: './src/index.tsx',
  output: {
    path: PATH.join(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
    assetFilter: function(assetFilename) {
      return !assetFilename.endsWith('.jpg');
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
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
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      SOCIAL_LOGIN: true,
      DEVELOPMENT_MODE: false,
      DEBUG_WS: false,
    }),
    ...(env && env.analyze ? [new BundleAnalyzerPlugin()] : [])
  ]
});
