const is = require('is');
const loaderUtils = require('loader-utils');

module.exports = (context, reIgnorePreLoaders) => {
	reIgnorePreLoaders = is.regexp(reIgnorePreLoaders) ? reIgnorePreLoaders : /eslint-loader/;
	return loaderUtils.getRemainingRequest({
		loaders: context.loaders.filter(loader => !reIgnorePreLoaders.test(loader.path)),
		loaderIndex: context.loaderIndex,
		resource: context.resource
	});
};
