const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = env => {
  const envName = env['development'] ? 'development' : 'production';
  const config = require('./webpack.' + envName);
  return merge(commonConfig, config);
};
