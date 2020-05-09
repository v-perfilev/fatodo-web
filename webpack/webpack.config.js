const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATH = require('path');

module.exports = () => ({
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: PATH.join(__dirname, '../dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              babelCore: '@babel/core'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        loader: 'file-loader',
        options: {
          digest: 'hex',
          hash: 'sha512',
          name: 'assets/[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {from: './public/', to: ''},
      {from: './public/favicon.ico', to: 'favicon.ico'}
    ])
  ]
});
