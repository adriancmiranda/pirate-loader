const { as } = require('describe-type');
const loaderUtils = require('loader-utils');

module.exports = (context, reIgnorePreLoaders) => {
	reIgnorePreLoaders = as(RegExp, reIgnorePreLoaders) || /eslint-loader/;
	return loaderUtils.getRemainingRequest({
		loaders: context.loaders.filter(({ path }) => !reIgnorePreLoaders.test(path)),
		loaderIndex: context.loaderIndex,
		resource: context.resource,
	});
};
