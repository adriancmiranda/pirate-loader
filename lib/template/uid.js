const path = require('path');
const hash = require('hash-sum');

const cache = Object.create(null);
const sepRE = new RegExp(path.sep.replace('\\', '\\\\'), 'g');

module.exports = (dirname, context, key) => {
	const contextPath = context.split(path.sep);
	const rootId = contextPath[contextPath.length - 1];
	const uid = `${rootId}/${path.relative(context, dirname).replace(sepRE, '/') + (key || '')}`;
	if (!cache[uid]) {
		cache[uid] = hash(uid);
	}
	return cache[uid];
};
