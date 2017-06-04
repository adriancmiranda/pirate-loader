const pirateLoader = require.resolve('../../pirate-loader');

module.exports = {
	output: {
		path: '/',
		filename: 'pirate-loader.spec.bundle.js',
	},
	module: {
		rules: [{
			test: /\.pirate$/,
			loader: pirateLoader,
		}],
	},
};
