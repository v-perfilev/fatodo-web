const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

const path = require('path');

module.exports = options => ({
    entry: './src/main/index.tsx',
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main/index.html'
        }),
        new TSLintPlugin({
            files: ['./src/main/**/*.ts']
        })
    ]
});
