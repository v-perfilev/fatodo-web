const webpack = require('webpack');
const merge = require('webpack-merge');
const sass = require('sass');
const commonConfig = require('./webpack.config.js');

const path = require('path');
const ENV = 'development';

module.exports = options => merge(commonConfig({env: ENV}), {
    mode: ENV,
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 9000
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
            // {
            //     test: /\.(woff|woff2|eot|ttf|svg)$/,
            //     loader: 'file-loader',
            //     options: {
            //         limit: 1024,
            //         name: '[name].[ext]',
            //         publicPath: 'dist/assets/',
            //         outputPath: 'dist/assets/'
            //     }
            // }
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
