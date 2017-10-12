'use strict'

process.env.BABEL_ENV = 'main'
const path = require('path')
const webpack = require('webpack')

let mainConfig = {
  entry: {
    main: path.join(__dirname, '../src/main/index.js')
  },
  module: {
    rules: [
      // {
      // 	test: /\.(js)$/,
      // 	enforce: 'pre',
      // 	exclude: /node_modules/,
      // 	use: {
      // 		loader: 'eslint-loader',
      // 		options: {
      // 			formatter: require('eslint-friendly-formatter')
      // 		}
      // 	}
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: false,
          forceEnv: 'main'
        },
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
  },
  resolve: {
    alias: {
      main: path.join(__dirname, '../src/renderer')
    },
    extensions: ['.js', '.json']
  },
  target: 'electron-main'
}
module.exports = mainConfig
