const pirateLoader = require('../');

module.exports = (resourcePath, opts, content) => {
	const options = Object.assign({}, opts);
	const webpackConfig = Object.assign({}, options.webpackConfig);
	delete options.webpackConfig;
	return {
		resourcePath: resourcePath,
		result: pirateLoader.call({
			options: {
				pirateLoader: options,
			},
		}, content || new Buffer('pirate')),
	};
};
