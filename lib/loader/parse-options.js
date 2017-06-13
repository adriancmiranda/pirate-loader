/* eslint-disable capitalized-comments, new-cap, no-unused-vars, array-callback-return */
const {is, stringifyInstances} = require('../common');

const ERR0RS = {
	describe(assert) {
		const json = {key: assert.key, data: assert.data};
		json.data.type = stringifyInstances(json.data.type, true);
		return `${json.key}:${JSON.stringify(json.data, null, 2)}`;
	},
	UNKN0W_SCHEM4: assert =>
		`[UNKN0W_SCHEM4]: Invalid ${ERR0RS.describe(assert)}`,
	CONFLICT_TYPE: assert =>
		`[CONFLICT_TYPE]: The default value doesn't match with ${ERR0RS.describe(assert)}`,
	UNEXPECTED_TYPE: assert =>
		`[UNEXPECTED_TYPE]: Unexpected type to ${ERR0RS.describe(assert)}`,
	INVALID_TYPE: assert =>
		`[INVALID_TYPE]: Invalid type to ${ERR0RS.describe(assert)}`
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
	if (is(Object, assert.data) && validateAssert(assert.data)) {
		return assert.data;
	}
	throw new TypeError(ERR0RS.UNKN0W_SCHEM4(assert));
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
	// console.log(`${config.key}:\n`, JSON.stringify(parseDataAssert(assert), null, 2), '\n');
	assert.data = parseDataAssert(assert);
	config.data = assertType(assert, config);
	// console.log('config.data:', config.key, config.data);
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
