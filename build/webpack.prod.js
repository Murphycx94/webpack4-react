process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  DefinePlugin
} = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const configFactory = require('./webpack.base');
const path = require('path');

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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].[hash:8].chunk.css',
    }),
    new BundleAnalyzerPlugin()
  ]
});
