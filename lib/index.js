const path = require('path');
const utils = require('loader-utils');
const loader = require('./loader');
const order = require('./order');
const template = require('./template');
const defaults = require('./defaults');

module.exports = function (content) {
	'use strict';

	this.cacheable && this.cacheable();

	// ~ query ~
	const query = utils.getOptions(this) || Object.create(null);

	// ~ options ~
	const configKey = query.config || 'pirateLoader';
	const options = Object.assign(defaults, this.options[configKey], this[configKey], query);

	// ~ flags ~
	const nodeEnv = /^node$/gi.test(this.target);
	const minimize = this.minimize || /^production$/gi.test(process.env.NODE_ENV);

	// ~ file ~
	const context = options.context || this.options.context || process.cwd();
	const filepath = path.relative(context, this.resourcePath).replace(/^(\.\.(\/|\\))+/g, '');
	const filename = path.basename(this.resourcePath);
	const file = template.parse(content, filename, this.sourceMap);
	// const remainingRequest = order.getRemainingRequest(this, options.ignorePreLoaders);
	const hmr = !minimize && !nodeEnv && (file.script || file.template);
	let output = '';

	// ~ tag script ~
	output += '';

	// ~ tag style ~
	output += '';

	// ~ tag view ~
	output += '';

	return output;
};
