const path = require('path');
const loaderUtils = require('loader-utils');
const deepExtend = require('deep-extend');
const parseOptions = require('./parse-options');

module.exports = (name, defaults, run) => function (content) {
	'use strict';

	if (this.cacheable) {
		this.cacheable();
	}

	// ~ query ~
	const query = loaderUtils.getOptions(this) || Object.create(null);

	// ~ options ~
	const configKey = query.config || name;
	const config = deepExtend(defaults, this.options[configKey], this[configKey], query);
	const options = parseOptions(defaults, config);

	// ~ env
	const nodeEnv = /^node$/gi.test(this.target);
	const minimize = this.minimize || /^production$/gi.test(process.env.NODE_ENV);
	const context = config.context || this.options.context || process.cwd();
	const filepath = path.relative(context, this.resourcePath).replace(/^(\.\.(\/|\\))+/g, '');
	const filename = path.basename(this.resourcePath);

	// ~ run ~
	return run.call(this, content, {
		data: options,
		context,
		filepath,
		filename,
		nodeEnv,
		minimize,
		config
	});
};

module.exports.ensureBang = require('./ensure-bang');
module.exports.ensureModuleExtension = require('./ensure-module-extension');
module.exports.stringifyLoaders = require('./stringify');
module.exports.getRemainingRequest = require('./get-remaining-request');
module.exports.load = require('./load');
