const path = require('path');
const utils = require('loader-utils');
const assign = require('deep-extend');
const defaults = require('./defaults');
const { is, as } = require('./data/type');
const parseData = require('./data/parse');
const parseTemplate = require('./template/parse');

module.exports = function pirateLoader(content) {
	'use strict';

	// ~ user options ~
	const query = utils.getOptions(this) || Object.create(null);
	const dataKey = as(String, query.config) || pirateLoader.name;
	const data = assign({}, this.options[dataKey], this[dataKey], query);
	const options = parseData(defaults, data);

	// ~ entry file ~
	const filePath = path.dirname(this.resourcePath);
	const fileName = path.basename(this.resourcePath);
	const fileTags = parseTemplate(content, fileName, this.sourceMap);

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
