const webpack = require('webpack');
const {ContextReplacementPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const PATH = require('path');

module.exports = () => ({
  entry: {
    main: './src/index.tsx',
    chat: './src/components/chat/_router.tsx',
    contact: './src/components/contact/_router.tsx',
    group: './src/components/group/_router.tsx',
    item: './src/components/item/_router.tsx'
  },
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
    new ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /en|ru/
    ),
    new CopyWebpackPlugin([
      {from: './public/', to: ''}
    ]),
    new Dotenv({
      path: '.env'
    }),
    new webpack.EnvironmentPlugin({
      BASE_URL: 'http://localhost:9000',
      API_URL: 'http://localhost:4000',
      RECAPTCHA_KEY: 'take_it_from_google'
    })
  ]
});
