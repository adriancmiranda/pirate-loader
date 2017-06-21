const path = require('path');
const loaderUtils = require('loader-utils');
const parse = require('./parse');

module.exports = function (content) {
	this.cacheable();
	const query = loaderUtils.getOptions(this) || Object.create(null);
	const filename = path.basename(this.resourcePath);
	const template = parse(content, filename, this.sourceMap);
	let tag = template[query.type];
	if (Array.isArray(tag)) {
		tag = tag[query.index];
	}
	this.callback(null, tag.content, tag.map);
};
