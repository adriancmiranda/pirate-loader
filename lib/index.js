const loader = require('./loader');
const template = require('./template');

const hasBuble = Boolean(loader.load('buble-loader'));
const hasBabel = Boolean(loader.load('babel-loader'));

module.exports = loader('pirateLoader', {
	extensionName: 'pirate',
	style: {
		optional: true,
		defaultLanguage: 'css',
		tagName: 'styles',
		loaders: {}
	},
	script: {
		optional: false,
		defaultLanguage: 'javascript',
		tagName: 'script',
		hotAccept: 'accept',
		hotDispose: 'accept',
		hotDecline: 'decline',
		hotApply: 'apply',
		loaders: {}
	},
	view: {
		optional: true,
		defaultLanguage: 'html',
		tagName: 'template',
		loaders: {}
	}
}, function (content, opts) {
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
