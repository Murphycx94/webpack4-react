const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const resolve = _path => path.join(__dirname, '..', _path);

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = {
  entry: resolve('src/main.jsx'),
  output: {
    path: resolve('dist/'),
    filename: 'js/main.[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
    alias: {
      'public': resolve('public'),
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // 图片loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      },
      // 音视频loader
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        }
      },
      // js、jsx loader
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)?$/,
        use: [
          'style-loader/url',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
    ]
  },
  // optimization: {
  //   minimize: false,
  //   splitChunks: {
  //     chunks: 'all',
  //     name: false
  //   }
  // },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('public'),
        to: resolve('dist'),
        toType: 'dir',
        ignore: [
          '.DS_Store'
        ]
      }
    ])
  ]
}
