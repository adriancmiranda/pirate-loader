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
		accept: 'accept',
		apply: 'apply',
		loaders: {}
	},
	view: {
		optional: true,
		defaultLanguage: 'html',
		tagName: 'template',
		loaders: {}
	}
}, function (content, options, $) {
	'use strict';

	// ~ file ~
	const file = template.parse(content, $.filename, this.sourceMap);
	const remainingRequest = loader.getRemainingRequest(this, options.ignorePreLoaders);
	const templateId = `data-${template.uid($.filepath, $.context, options.hashKey)}`;
	const hmr = !$.minimize && !$.nodeEnv && (file.script || file.template);

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
