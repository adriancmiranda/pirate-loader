const path = require('path');
const pirateLoader = require.resolve('../../');
const resolve = (...rest) => path.join(__dirname, ...rest);

module.exports = {
	context: resolve('..'),
	output: {
		path: resolve('../bundle'),
		filename: 'pirate-loader.spec.bundle.js',
	},
	module: {
		rules: [{
			test: /\.pirate$/,
			loader: pirateLoader,
		}],
	},
};
