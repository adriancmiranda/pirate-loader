const { SourceMapGenerator } = require('source-map');

const splitRE = /\r?\n/g;
const emptyRE = /^(?:\/\/)?\s*$/;

module.exports = (filename, source, block) => {
	const map = new SourceMapGenerator();
	map.setSourceContent(filename, source);
	block.split(splitRE).forEach((line, index) => {
		if (!emptyRE.test(line)) {
			map.addMapping({
				source: filename,
				original: {
					line: index + 1,
					column: 0,
				},
				generated: {
					line: index + 1,
					column: 0,
				},
			});
		}
	});
	return map.toJSON();
};
