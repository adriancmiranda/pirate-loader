/* eslint-disable capitalized-comments, new-cap, no-unused-vars, array-callback-return */
const {is, stringifyInstances} = require('../common');

const ERR0RS = {
	toString(assert) {
		const json = {key: assert.key, data: assert.data};
		json.data.type = stringifyInstances(json.data.type);
		return `${json.key}:${JSON.stringify(json.data, null, 2)}`;
	},
	UNKN0W_SCHEM4: assert =>
		`[UNKN0W_SCHEM4]: Invalid ${ERR0RS.toString(assert)}`
};

const PR0PERTIES = {
	type: true,
	required: true,
	default: false
};

function mapAssertProps(object, onlyRequired) {
	return Object.keys(object).filter(key => onlyRequired ? object[key] : key);
}

function validateProp(prop, onlyRequired) {
	const requiredProps = mapAssertProps(PR0PERTIES, onlyRequired).join('|');
	return new RegExp(`^(${requiredProps})$`).test(prop);
}

function validateRequiredProp(prop) {
	return validateProp(prop, true);
}

function validateAssert(object) {
	const objRequired = Object.keys(object).filter(validateRequiredProp);
	const allRequired = mapAssertProps(PR0PERTIES, true);
	return objRequired.length === allRequired.length;
}

function parseDataAssert(assert) {
	if (is([String, Function, Array], assert.data)) {
		const type = stringifyInstances(assert.data);
		return {type, required: true};
	}
	if (is(Object, assert.data) && validateAssert(assert.data)) {
		return assert.data;
	}
	throw new TypeError(ERR0RS.UNKN0W_SCHEM4(assert));
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
	// console.log('config.data:', config.data);
	if (assert.data.required && !assert.data.default) {
		return console.warn(`Missing required prop: "${config.key}"`);
	}
	return config.data;
}

// function assertDefault(assert, config) {
// 	if (is(Function, assert.data.default)) {
// 		assert.data.default = assert.data.default(assert, config);
// 	}
// 	if (is(Object, assert.data.default)) {
// 		assert.data.default = module.exports(assert.data.default);
// 	}
// 	if (is(Array, assert.data.default)) {
// 		// N/A yet.
// 	}
// }

function assertOption(assert, config) {
	console.log(`${config.key}:\n`, JSON.stringify(parseDataAssert(assert), null, 2), '\n');
	assert.data = parseDataAssert(assert);
	// config.data = assertType(assert, config);
	// config.data = assertRequired(assert, config);
	// config.data = assertDefault(assert, config);
	return config.data;
}

module.exports = (patterns, settings = {}) => {
	const schema = Object(patterns);
	const config = Object(settings);
	return Object.keys(schema).map(key => {
		if (key.startsWith('$')) {
			const slug = key.substring(1);
			const assertObject = {key, data: schema[key]};
			const configObject = {key: slug, data: config[slug]};
			return assertOption(assertObject, configObject);
		}
	}).filter(v => v)[0];
};
