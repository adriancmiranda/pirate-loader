const data = require('./data');
const template = require('./template');
const defaults = require('./defaults');

const hasBuble = Boolean(data.load('buble-loader'));
const hasBabel = Boolean(data.load('babel-loader'));

module.exports = data('pirateLoader', defaults, function (content, utils, opts) {
	'use strict';

	// ~ file ~
	const file = template.parse(content, opts.filename, this.sourceMap);
	const remainingRequest = data.getRemainingRequest(this, opts.config.ignorePreLoaders);
	const templateId = `data-${template.uid(opts.filepath, opts.context, opts.config.hashKey)}`;
	const hmr = !opts.minimize && !opts.nodeEnv && (file.script || file.template);

	console.log('\n\n->\n', opts.config, '\n\n');
	console.log(hasBuble, hasBabel, templateId, remainingRequest, hmr);

	const output = [];

	// ~ tag script ~
	output.push('//- script');

	// ~ tag style ~
	output.push('//- style');

	// ~ tag view ~
	output.push('//- view');

	return output.join('');
});
