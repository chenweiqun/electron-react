'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devtool: '#cheap-module-eval-source-map',
  target: 'electron-renderer',
  entry: {
    renderer: [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      path.join(__dirname, '../src/renderer/index.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../dist/electron'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      renderer: path.join(__dirname, '../src/renderer'),
      pages: path.join(__dirname, '../src/renderer/components/pages'),
      views: path.join(__dirname, '../src/renderer/components/views'),
      assets: path.join(__dirname, '../src/renderer/assets')
    },
    extensions: ['.js', '.json', '.jsx', '.less']
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            forceEnv: 'renderer'
          }
        },
        include: path.join(__dirname, '../src/renderer')
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../index.html')
    })
  ]
}
