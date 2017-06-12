const loader = require('./loader');
const template = require('./template');
const defaults = require('./defaults');

const hasBuble = Boolean(loader.load('buble-loader'));
const hasBabel = Boolean(loader.load('babel-loader'));

module.exports = loader('pirateLoader', defaults, function (content, opts) {
	'use strict';

	// ~ file ~
	const file = template.parse(content, opts.filename, this.sourceMap);
	const remainingRequest = loader.getRemainingRequest(this, opts.config.ignorePreLoaders);
	const templateId = `data-${template.uid(opts.filepath, opts.context, opts.config.hashKey)}`;
	const hmr = !opts.minimize && !opts.nodeEnv && (file.script || file.template);

	console.log(hasBuble, hasBabel, templateId, remainingRequest, hmr);

	let output = '';

	// ~ tag script ~
	output += '//- script';

	// ~ tag style ~
	output += '//- style';

	// ~ tag view ~
	output += '//- view';

	return output;
});
