/* eslint-disable capitalized-comments */
const path = require('path');
const loaderUtils = require('loader-utils');
const deepExtend = require('deep-extend');
const parseOptions = require('./parse');

module.exports = (name, defaults, run) => function (content) {
	'use strict';

	this.cacheable();

	// ~ query ~
	const query = loaderUtils.getOptions(this) || Object.create(null);

	// ~ options ~
	const configKey = query.config || name;
	const config = deepExtend({}, this.options[configKey], this[configKey], query);
	const options = parseOptions(defaults, config);

	// ~ env
	const nodeEnv = /^node$/gi.test(this.target);
	const minimize = this.minimize || /^production$/gi.test(process.env.NODE_ENV);
	const context = config.context || this.options.context || process.cwd();
	const filepath = path.relative(context, this.resourcePath).replace(/^(\.\.(\/|\\))+/g, '');
	const filename = path.basename(this.resourcePath);

	// ~ file ~
	// const file = template.parse(content, opts.filename, this.sourceMap);
	// const remainingRequest = data.getRemainingRequest(this, opts.config.ignorePreLoaders);
	// const templateId = `data-${template.uid(opts.filepath, opts.context, opts.config.hashKey)}`;
	// const hmr = !opts.minimize && !opts.nodeEnv && (file.script || file.template);

	// ~ run ~
	return run.call(this, content, null, {
		config: options,
		context,
		filepath,
		filename,
		nodeEnv,
		minimize
	});
};

// module.exports.ensureBang = require('./ensure-bang');
module.exports.ensureModuleExtension = require('./ensure-module-extension');
module.exports.stringifyLoaders = require('./stringify');
module.exports.getRemainingRequest = require('./get-remaining-request');
module.exports.load = require('./load');