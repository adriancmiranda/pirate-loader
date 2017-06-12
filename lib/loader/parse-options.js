const {is} = require('../common');

function assertOption(assert, config) {
	if (is(Function, assert.data.default)) {
		assert.data.default = assert.data.default(assert, config);
	}
	if (is(Object, assert.data.default)) {
		assert.data.default = module.exports(assert.data.default);
	}
	if (assert.data.required) {
		return console.warn(`Missing required prop: "${config.key}"`);
	}
	console.log('->', config.key);
	return config.data;
}

module.exports = (defaults, config = {}) => {
	const opts = is(Object, defaults) ? defaults : {};
	return Object.keys(opts).map(key => {
		const slug = key.startsWith('$') ? key.substring(1) : key;
		const assertObject = {key, data: opts[key]};
		const configObject = {key: slug, data: config[slug]};
		return assertOption(assertObject, configObject);
	})[0];
};
