const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '../test/specs'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /test.js$/,
      use: 'mocha-loader',
      exclude: /node_modules/,
    }]
  }
};
