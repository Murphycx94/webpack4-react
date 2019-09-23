process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  DefinePlugin
} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const configFactory = require('./webpack.base');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require('postcss-safe-parser');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = _path => path.join(__dirname, '..', _path);

const base = configFactory(process.env.NODE_ENV);

const config = {
  publicPath: '/'
}

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: config.publicPath
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser
        }
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: true,
    },
    runtimeChunk: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      templateParameters: {
        BASE_URL: config.publicPath
      }
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BASE_URL: '"/"'
      }
    }),
    // new BundleAnalyzerPlugin(),
  ]
});
