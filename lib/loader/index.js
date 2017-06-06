const path = require('path');
const loaderUtils = require('loader-utils');
const deepExtend = require('deep-extend');

module.exports = (name, defaults, run) => function (content) {
	'use strict';

	/**
	 * Cacheable
	 *
	 * If a loader uses external resources (i. e. by reading from filesystem),
	 * they must tell about that.
	 * -
	 * This information is used to invalidate cacheable loaders and recompile
	 * in watch mode.
	 *
	 * @see https://webpack.github.io/docs/how-to-write-a-loader.html#mark-dependencies
	 */
	if (this.cacheable) {
		this.cacheable();
	}

	// ~ query ~
	const query = loaderUtils.getOptions(this) || Object.create(null);

	// ~ options ~
	const configKey = query.config || name;
	const options = deepExtend(defaults, this.options[configKey], this[configKey], query);

	// ~ env
	const nodeEnv = /^node$/gi.test(this.target);
	const minimize = this.minimize || /^production$/gi.test(process.env.NODE_ENV);
	const context = options.context || this.options.context || process.cwd();
	const filepath = path.relative(context, this.resourcePath).replace(/^(\.\.(\/|\\))+/g, '');
	const filename = path.basename(this.resourcePath);

	// ~ run ~
	return run.call(this, {
		context,
		filepath,
		filename,
		nodeEnv,
		minimize
	}, content, options);
};

module.exports.ensureBang = require('./ensure-bang');
module.exports.ensureModuleExtension = require('./ensure-module-extension');
module.exports.stringifyLoaders = require('./stringify');
module.exports.getRemainingRequest = require('./get-remaining-request');
module.exports.load = require('./load');
