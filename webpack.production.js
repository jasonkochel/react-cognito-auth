const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/Authenticator.js',
  output: {
    path: path.resolve('build'),
    filename: 'Authenticator.js',
    libraryTarget: 'commonjs2',
  },
};
