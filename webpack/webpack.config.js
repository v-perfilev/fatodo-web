const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = options => ({
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                exclude: ['/node_modules/']
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loader: 'file-loader',
                // options: {
                //     digest: 'hex',
                //     hash: 'sha512',
                //     name: 'content/[hash].[ext]'
                // }
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    publicPath: 'dist/assets/',
                    outputPath: 'dist/assets/'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new TSLintPlugin({
            files: ['./src/**/*.ts']
        }),
        new CopyWebpackPlugin([
            {from: './public/', to: ''}
        ])
    ]
});
