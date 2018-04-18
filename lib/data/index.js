const { as } = require('describe-type');
const utils = require('loader-utils');
const assign = require('deep-extend');
const options = require('./options');

module.exports = (loader, dataKeyDefault) => {
	const query = utils.getOptions(loader) || Object.create(null);
	const dataKey = as(String, query.config) || dataKeyDefault;
	const userConfig = assign({}, loader.options, loader.options[dataKey], loader[dataKey], query);
	return options(loader, userConfig);
};
