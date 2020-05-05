const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.config.js");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const ENV = "production";

module.exports = () => merge(commonConfig({ env: ENV }), {
  mode: ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.css$/,
        loader: "stripcomment-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    minimize: true,

    minimizer: [
      new TerserPlugin()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        SERVER_API_URL: JSON.stringify("http://localhost:4000/api")
      }
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
});
