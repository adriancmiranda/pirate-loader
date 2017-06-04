const path = require('path');
const utils = require('loader-utils');
const loader = require('./loader');
const order = require('./order');
const template = require('./template');

module.exports = function (content) {
	'use strict';

	this.cacheable && this.cacheable();

	// ~ query ~
	const query = utils.getOptions(this) || Object.create(null);

	// ~ options ~
	const configKey = query.config || 'pirateLoader';
	const options = Object.assign({}, this.options[configKey], this[configKey], query);

	// ~ file ~
	const output = '';
	const remainingRequest = order.getRemainingRequest(this, options.ignorePreLoaders);

	// ~ tag script ~

	// ~ tag style ~

	// ~ tag view ~

	return output;
};
