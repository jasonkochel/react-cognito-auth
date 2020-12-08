const path = require('path');
const webpack = require('webpack');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/DemoApp.js',
  output: {
    path: path.resolve('build'),
    filename: 'DemoApp.js',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: path.join(__dirname, 'build/'),
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      templateContent: ({ htmlWebpackPlugin }) => `
        <html>
          <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <div id="root"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
};
