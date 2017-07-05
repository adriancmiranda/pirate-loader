const path = require('path');
const data = require('./data');
const template = require('./template');

module.exports = function pirateLoader(content) {
	'use strict';

	// ~ user options ~
	const options = data(this, 'pirate');

	// ~ file info ~
	const file = Object.create(null);
	file.path = path.dirname(this.resourcePath);
	file.name = path.basename(this.resourcePath);
	file.guid = `data-${options.extensionName}-${template.guid(file.path, options.context, options.hashKey)}`;
	file.link = path.relative(options.context, this.resourcePath).replace(/^(\.\.(\/|\\))+/, '');
	file.tags = template.parse(content, file.name, this.sourceMap);
	file.mini = this.minimize || /^production$/gi.test(process.env.NODE_ENV);
	file.node = /^node$/gi.test(this.target);
	file.burn = !file.mini && !file.node && (
		file.tags(options.script.tagName)[0] ||
		file.tags(options.view.tagName)[0]
	);

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
