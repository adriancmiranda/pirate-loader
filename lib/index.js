const path = require('path');
const parseTemplate = require('./template/parse');

module.exports = function (content) {
	'use strict';

	const output = [];
	const filePath = this.resourcePath;
	const fileName = path.basename(filePath);
	const tags = parseTemplate(content, fileName, this.sourceMap);

	console.log('filePath:', filePath);
	console.log('fileName:', fileName);
	console.log('tags:', tags);

	// ~ tag script ~
	output.push('//- script');

	// ~ tag style ~
	output.push('//- style');

	// ~ tag view ~
	output.push('//- view');

	return output.join('\n');
};
