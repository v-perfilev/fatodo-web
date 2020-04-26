const webpack = require('webpack');
const merge = require('webpack-merge');
const sass = require('sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.config.js');

const path = require('path');
const ENV = 'production';

module.exports = options => merge(commonConfig({env: ENV}), {
    mode: ENV,
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.s?css$/,
                loader: 'stripcomment-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         publicPath: '../'
                    //     }
                    // },
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {implementation: sass}
                    }
                ]
            }
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
