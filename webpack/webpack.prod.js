const webpack = require('webpack');
const merge = require('webpack-merge');
const sass = require('sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
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
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new TerserWebpackPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    ecma: 6,
                    toplevel: true,
                    module: true,
                    beautify: false,
                    comments: false,
                    compress: {
                        warnings: false,
                        ecma: 6,
                        module: true,
                        toplevel: true
                    },
                    output: {
                        comments: false,
                        beautify: false,
                        indent_level: 2,
                        ecma: 6
                    },
                    mangle: {
                        keep_fnames: true,
                        module: true,
                        toplevel: true
                    }
                }
            }),
            new OptimizeCSSAssetsWebpackPlugin({})
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                SERVER_API_URL: JSON.stringify("http://localhost:4000/api")
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            filename: 'assets/[name].[hash].css',
            chunkFilename: 'assets/[name].[hash].css'
        }),
    ]
});
