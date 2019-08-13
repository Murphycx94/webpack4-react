const {
  DefinePlugin,
  NoEmitOnErrorsPlugin,
  HotModuleReplacementPlugin
} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');

const resolve = _path => path.join(__dirname, '..', _path);

const config = {
  publicPath: '/'
}

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    base.entry
  ],
  output: {
    publicPath: config.publicPath
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
        NODE_ENV: '"development"',
        BASE_URL: '"/"'
      }
    }),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
});
