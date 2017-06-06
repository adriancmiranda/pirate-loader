const path = require('path');
const utils = require('loader-utils');
const deepExtend = require('deep-extend');
const loader = require('./loader');
const order = require('./order');
const template = require('./template');

module.exports = function (content) {
	'use strict';

	if (this.cacheable) {
		this.cacheable();
	}

	// ~ query ~
	const query = utils.getOptions(this) || Object.create(null);

	// ~ options ~
	const configKey = query.config || 'pirateLoader';
	const options = deepExtend({

	}, this.options[configKey], this[configKey], query);

	// ~ flags ~
	const nodeEnv = /^node$/gi.test(this.target);
	const minimize = this.minimize || /^production$/gi.test(process.env.NODE_ENV);

	// ~ file ~
	const context = options.context || this.options.context || process.cwd();
	const filepath = path.relative(context, this.resourcePath).replace(/^(\.\.(\/|\\))+/g, '');
	const filename = path.basename(this.resourcePath);
	const file = template.parse(content, filename, this.sourceMap);
	const remainingRequest = order.getRemainingRequest(this, options.ignorePreLoaders);
	const templateId = `data-${template.uid(filepath, context, options.hashKey)}`;
	const hmr = !minimize && !nodeEnv && (file.script || file.template);

	console.log(templateId, loader, filepath, remainingRequest, hmr);

	let output = '';

	// ~ tag script ~
	output += '//- script';

	// ~ tag style ~
	output += '//- style';

	// ~ tag view ~
	output += '//- view';

	return output;
};
