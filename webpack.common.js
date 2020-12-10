const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [process.env.NODE_ENV == "development" && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
    fallback: {
      crypto: path.resolve(__dirname, './node_modules/crypto-browserify'),
      stream: path.resolve(__dirname, './node_modules/stream-browserify'),
    },
  },
};
