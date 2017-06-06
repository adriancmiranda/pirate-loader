const cheerio = require('cheerio');
const cache = require('lru-cache')(100);
const hash = require('hash-sum');
const {SourceMapGenerator} = require('source-map');

const splitRE = /\r?\n/g;
const emptyRE = /^(?:\/\/)?\s*$/;

module.exports = (content, basename, useSourceMap) => {
	const cacheKey = hash(basename + content);
	const filename = `${basename}?${cacheKey}`;
	let output = cache.get(cacheKey);
	if (output) return output;
	output = cheerio.load(content);
	if (useSourceMap) {
		const sourceMap = module.exports.sourceMap;
		const script = output('script');
		if (script.get(0) && !script.attr('src')) {
			script.data('source-map', sourceMap(
				filename, content, script.text()
			));
		}
		const style = output('style');
		if (style.get(0)) {
			style.data('source-map', sourceMap(
				filename, content, style.text()
			));
		}
	}
	cache.set(cacheKey, output);
	return output;
};

module.exports.sourceMap = (filename, source, block) => {
	const map = new SourceMapGenerator();
	map.setSourceContent(filename, source);
	block.split(splitRE).forEach((line, index) => {
		if (!emptyRE.test(line)) {
      map.addMapping({
        source: filename,
        original: {
          line: index + 1,
          column: 0
        },
        generated: {
          line: index + 1,
          column: 0
        }
      })
		}
	});
	return map.toJSON();
};
