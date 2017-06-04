const loaderUtils = require('loader-utils');
const {is} = require('../common');

module.exports = (context, reIgnorePreLoaders) => {
	reIgnorePreLoaders = is('RegExp', reIgnorePreLoaders) ? reIgnorePreLoaders : /eslint-loader/;
	return loaderUtils.getRemainingRequest({
		loaders: context.loaders.filter(loader => !reIgnorePreLoaders.test(loader.path)),
		loaderIndex: context.loaderIndex,
		resource: context.resource
	});
};
