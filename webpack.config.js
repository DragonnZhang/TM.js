/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { util } = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    'basic-cube': './src/examples/basic-cube/basic-cube.ts',
    lego: './src/examples/lego/lego.ts'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TM.js demo - basic-cube',
      filename: 'basic-cube.html',
      template: './src/examples/basic-cube/index.html',
      chunks: ['basic-cube']
    }),
    new HtmlWebpackPlugin({
      title: 'TM.js demo - lego',
      filename: 'lego.html',
      template: './src/examples/lego/index.html',
      chunks: ['lego']
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/public'
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.html', '.hbs', '.svg']
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
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
    innerGraph: true
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
        include: path.resolve(__dirname, 'src/examples')
      }
    ]
  }
}
