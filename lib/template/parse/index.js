const cheerio = require('cheerio');
const cache = require('lru-cache')(100);
const hash = require('hash-sum');
const sourceMap = require('./source-map');

module.exports = (content, basename, useSourceMap) => {
	const cacheKey = hash(basename + content);
	const filename = `${basename}?${cacheKey}`;
	let output = cache.get(cacheKey);
	if (output) return output;
	output = cheerio.load(content);
	if (useSourceMap) {
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

module.exports.sourceMap = require('./source-map');
