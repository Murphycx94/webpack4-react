const {
  DefinePlugin
} = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');

const resolve = _path => path.join(__dirname, '..', _path);

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

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
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: true,
    },
    runtimeChunk: true
  },
  plugins: [
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
    new BundleAnalyzerPlugin(),
    new CompressionPlugin()
  ]
});
