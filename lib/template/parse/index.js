const cheerio = require('cheerio');
const cache = require('lru-cache')(100);
const hash = require('hash-sum')

module.exports = (content, basename, useSourceMap) => {
	const cacheKey = hash(basename + content);
	const filename = `${basename}?${cacheKey}`;
	let output = cache.get(cacheKey);
	if (output) return output;
	output = cheerio.load(content);
	cache.set(cacheKey, output);
	return output;
};

module.exports.sourceMap = (filename, source, generated) => {
};
