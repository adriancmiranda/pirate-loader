/* eslint-disable capitalized-comments, new-cap, no-unused-vars, array-callback-return */
const {is, stringifyInstances, describe} = require('../common');

const ERR0RS = {
	UNKN0WN_SCHEM4: assert =>
		`[UNKN0WN_SCHEM4]: Unknown ${ERR0RS.describe(assert)}`,
	INVALID_SCHEM4: assert =>
		`[INVALID_SCHEM4]: Invalid ${ERR0RS.describe(assert)}`,
	UNKN0WN_TYPE: assert =>
		`[UNKN0WN_TYPE]: Unknown type to ${ERR0RS.describe(assert)}`,
	INVALID_TYPE: assert =>
		`[INVALID_TYPE]: Invalid type to ${ERR0RS.describe(assert)}`,
	CONFLICT_TYPE: assert =>
		`[CONFLICT_TYPE]: The default value doesn't match with ${ERR0RS.describe(assert)}`,
	UNEXPECTED_TYPE: assert =>
		`[UNEXPECTED_TYPE]: Unexpected type to ${ERR0RS.describe(assert)}`,
	describe(assert) {
		const json = Object.assign({}, assert);
		json.data.type = stringifyInstances(json.data.type, true);
		return `${json.key}:${describe(json.data, 2)}`;
	}
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
		return {type: stringifyInstances(assert.data, true), required: PR0PERTIES.required};
	}
	if (is.not(Object, assert.data)) {
		throw new TypeError(ERR0RS.UNKN0WN_SCHEM4(assert));
	}
	if ('default' in assert.data && is.not(assert.data.type, assert.data.default)) {
		throw new TypeError(ERR0RS.CONFLICT_TYPE(assert));
	}
	if (!validateAssert(assert.data)) {
		throw new TypeError(ERR0RS.INVALID_SCHEM4(assert));
	}
	return assert.data;
}

function assertType(assert, config) {
	if (is(assert.data.type, config.data)) {
		return config.data;
	}
	if (is(Object, assert.data.default)) {
		return module.exports(assert.data.default);
	}
	if (is(assert.data.type, assert.data.default)) {
		return assert.data.default;
	}
	if ('default' in assert.data) {
		return assert.data.default;
	} else {
		throw new TypeError(ERR0RS.CONFLICT_TYPE(assert));
	}
	throw new TypeError(ERR0RS.UNEXPECTED_TYPE(assert));
}

function assertRequired(assert, config) {
	// console.log('config.data:', config.data);
	// if (assert.data.required && !assert.data.default) {
	// 	return console.warn(`Missing required prop: "${config.key}"`);
	// }
	return config.data;
}

function assertDefault(assert, config) {
	return config.data;
// 	if (is(Function, assert.data.default)) {
// 		assert.data.default = assert.data.default(assert, config);
// 	}
// 	if (is(Object, assert.data.default)) {
// 		assert.data.default = module.exports(assert.data.default);
// 	}
// 	if (is(Array, assert.data.default)) {
// 		// N/A yet.
// 	}
}

function assertOption(assert, config) {
	// console.log(`${config.key}:\n`, JSON.stringify(parseDataAssert(assert), null, 2), '\n');
	assert.data = parseDataAssert(assert);
	config.data = assertType(assert, config);
	config.data = assertRequired(assert, config);
	config.data = assertDefault(assert, config);
	// console.log('config.data:', config.key, config.data);
	return config;
}

module.exports = (patterns, settings = {}) => {
	const schema = Object(patterns);
	const object = Object(settings);
	return Object.keys(schema).map(key => {
		if (key.startsWith('$')) {
			const copy = {};
			const slug = key.substring(1);
			const assert = {key, data: schema[key]};
			const config = {key: slug, data: object[slug]};
			const result = assertOption(assert, config);
			copy[result.key] = result.data;
			return copy;
		}
	}).filter(v => v)[0];
};
