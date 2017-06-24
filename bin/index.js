const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../test'),
  entry: './index.test.js',
  output: {
    path: path.resolve(__dirname, '../test/specs'),
    filename: 'test.bundle.js'
  },
  module: {
    rules: [{
      test: /test.js$/,
      use: 'mocha-loader',
      exclude: /node_modules/,
    }]
  }
};
