/* eslint-disable capitalized-comments */
const {is, stringifyInstances} = require('../common');

// const defaults = {
// 	type: [Function, Array, String],
// 	required: false,
// 	default: undefined
// };

function parseDataAssert(assert) {
	// if (is(defaults.type, assert.data)) {
	// 	return assert.data;
	// }
	const type = stringifyInstances(assert.data);
	return {type, required: false,
		default: /\bFunction\b/.test(type) ? type : assert.data
	};
}

function assertType(assert, config) {
	if (is.not(Object, assert.data)) {
		// required: false // if.not(assert.data, Function, Array, String)
		// default // if.not(assert.data, Function, Array, String) if(assert.data, String)
		assert.data = {type: assert.data};
	}
	if (is(assert.data.type, config.data)) {
		return config.data;
	}
	return assert.data.default;
}

function assertRequired(assert, config) {
	console.log('config.data:', config.data);
	if (assert.data.required && !assert.data.default) {
		return console.warn(`Missing required prop: "${config.key}"`);
	}
	return config.data;
}

function assertDefault(assert, config) {
	if (is(Function, assert.data.default)) {
		assert.data.default = assert.data.default(assert, config);
	}
	if (is(Object, assert.data.default)) {
		assert.data.default = module.exports(assert.data.default);
	}
	if (is(Array, assert.data.default)) {
		// N/A yet.
	}
}

function assertOption(assert, config) {
	console.log('->', parseDataAssert(assert));
	assert.data = parseDataAssert(assert);
	config.data = assertType(assert, config);
	config.data = assertRequired(assert, config);
	config.data = assertDefault(assert, config);
	return config.data;
}

module.exports = (patterns, settings = {}) => {
	const schema = Object(patterns);
	const config = Object(settings);
	return Object.keys(schema).map(key => {
		const slug = key.startsWith('$') ? key.substring(1) : key;
		const assertObject = {key, data: schema[key]};
		const configObject = {key: slug, data: config[slug]};
		return assertOption(assertObject, configObject);
	})[0];
};
