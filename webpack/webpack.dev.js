const webpack = require('webpack');
const merge = require('webpack-merge');
const sass = require('sass');
const commonConfig = require('./webpack.config.js');

const path = require('path');
const ENV = 'development';

module.exports = options => merge(commonConfig({env: ENV}), {
    mode: ENV,
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', {
                    loader: 'sass-loader',
                    options: {implementation: sass}
                }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                SERVER_API_URL: JSON.stringify("http://localhost:4000/api")
            }
        })
    ]
});
