const path = require('path');
const utils = require('loader-utils');
const assign = require('deep-extend');
const { as } = require('describe-type');
const data = require('./data');
const template = require('./template');

module.exports = function pirateLoader(content) {
	'use strict';

	// ~ user options ~
	const query = utils.getOptions(this) || Object.create(null);
	const dataKey = as(String, query.config) || pirateLoader.name;
	const options = data(assign({}, this.options, this.options[dataKey], this[dataKey], query));

	// ~ env ~
	const context = options.context || process.cwd();
	const nodeEnv = /^node$/gi.test(this.target);
	const minimize = this.minimize || /^production$/gi.test(process.env.NODE_ENV);

	// ~ file info ~
	const file = Object.create(null);
	file.path = path.dirname(this.resourcePath);
	file.name = path.basename(this.resourcePath);
	file.guid = `data-${template.guid(file.path, context, options.hashKey)}`;
	file.link = path.relative(context, this.resourcePath).replace(/^(\.\.(\/|\\))+/, '');
	file.tags = template.parse(content, file.name, this.sourceMap);
	file.burn = !minimize && !nodeEnv && (file.tags('script')[0] || file.tags('template')[0]);

	console.log(`[HMR] ${file.link}#${file.guid}:`, file.burn);

	// ~ content ~
	const output = [''];

	// ~ tag script ~
	output.push('//- script');

	// ~ tag style ~
	output.push('//- style');

	// ~ tag view ~
	output.push('//- view');

	// ~ 2 string ~
	return output.join('\n');
};
