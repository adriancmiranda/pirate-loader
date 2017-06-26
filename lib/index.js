const path = require('path');
const utils = require('loader-utils');
const assign = require('deep-extend');
const { as } = require('describe-type');
const defaults = require('./defaults');
const parseData = require('./data/parse');
const template = require('./template');

module.exports = function pirateLoader(content) {
	'use strict';

	// ~ user options ~
	const query = utils.getOptions(this) || Object.create(null);
	const dataKey = as(String, query.config) || pirateLoader.name;
	const data = assign({}, this.options, this.options[dataKey], this[dataKey], query);
	const options = parseData(defaults, data);

	// ~ env ~
	const context = options.context || process.cwd();
	const nodeEnv = /^node$/gi.test(this.target);
	const minimize = this.minimize || /^production$/gi.test(process.env.NODE_ENV);

	// ~ file info ~
	const filePath = path.dirname(this.resourcePath);
	const fileName = path.basename(this.resourcePath);
	const fileLink = path.relative(context, this.resourcePath).replace(/^(\.\.(\/|\\))+/, '');
	const fileTags = template.parse(content, fileName, this.sourceMap);
	const fileGuid = `data-${template.guid(filePath, context, options.hashKey)}`;
	const hmr = !minimize && !nodeEnv && (fileTags('script')[0] || fileTags('template')[0]);

	console.log(`[HMR] ${fileLink}#${fileGuid}:`, hmr);

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
