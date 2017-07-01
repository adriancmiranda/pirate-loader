const type = require('describe-type');
const utils = require('loader-utils');
const assign = require('deep-extend');
const options = require('./options');
const parse = require('./parse');

module.exports = (loader) => {
	const query = utils.getOptions(loader) || Object.create(null);
	const dataKey = type.as(String, query.config) || type.name(loader);
	const userConfig = assign({}, loader.options, loader.options[dataKey], loader[dataKey], query);
	return parse(options, userConfig);
};
