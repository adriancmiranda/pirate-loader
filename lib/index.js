const path = require('path');
const utils = require('loader-utils');
const loader = require('./loader');
const order = require('./order');
const template = require('./template');

module.exports = function (content) {
	'use strict';

	this.cacheable && this.cacheable();

	// ~ flags ~
	const nodeEnv = /^node$/g.test(this.target);

	// ~ query ~
	const query = utils.getOptions(this) || Object.create(null);

	// ~ options ~
	const configKey = query.config || 'pirateLoader';
	const options = Object.assign({}, this.options[configKey], this[configKey], query);

	// ~ file ~
	const context = options.context || this.options.context || process.cwd();
	const filepath = this.resourcePath;
	const filename = path.basename(filepath);
	const file = template.parser.parse(content, filename, this.sourceMap);
	const relation = path.relative(context, filepath).replace(/^(\.\.(\/|\\))+/g, '');
	const remainingRequest = order.getRemainingRequest(this, options.ignorePreLoaders);
	const output = '';

	// ~ tag script ~

	// ~ tag style ~

	// ~ tag view ~

	return output;
};
