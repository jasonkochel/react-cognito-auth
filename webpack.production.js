const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/Authenticator.js',
  output: {
    path: path.resolve('build'),
    filename: 'Authenticator.js',
    libraryTarget: 'commonjs2',
  },
  externals: {	
    // Don't bundle React or Amplify	
    react: {	
      commonjs: 'react',	
      commonjs2: 'react',	
      amd: 'React',	
      root: 'React',	
    },	
    'react-dom': {	
      commonjs: 'react-dom',	
      commonjs2: 'react-dom',	
      amd: 'ReactDOM',	
      root: 'ReactDOM',	
    },	
    'aws-amplify': {	
      commonjs: 'aws-amplify',	
      commonjs2: 'aws-amplify',	
    },	
  },
};
