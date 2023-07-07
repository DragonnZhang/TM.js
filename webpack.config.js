/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { util } = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/example/test.ts'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TM.js demo',
      template: './src/example/index.html'
    })
  ],
  devServer: {
    static: './dist'
  },
  resolve: {
    extensions: ['.ts', '.js', '.html', '.hbs', '.svg'],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    innerGraph: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jpeg$/i,
        type: 'asset/resource'
      },
      {
        test: /\.obj$/i,
        use: 'url-loader',
        include: path.resolve(__dirname, 'src/example'),
      }
    ]
  }
};