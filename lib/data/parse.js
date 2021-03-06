const { is, as, typify } = require('describe-type');
const stringify = require('./stringify');
const PLInputError = require('./error');

const PR0PERTIES = {
	type: true,
	required: true,
	default: false,
};

function describe(object) {
	const copy = Object.assign({}, object);
	copy.data = Object.assign({}, copy.data);
	copy.data.type = typify(copy.data.type, true);
	return `${copy.key}:${stringify(copy.data, 2)}`;
}

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

function parseAssert(assert, config, node) {
	if (is([String, Function, Array, null, undefined], assert.data)) {
		return { type: typify(assert.data, true), required: PR0PERTIES.required };
	}
	if (is.not(Object, assert.data)) {
		throw PLInputError.UNKN0WN_SCHEM4(describe(assert));
	}
	if ('default' in assert.data) {
		assert.data.default = as(assert.data.type, assert.data.default, config, node);
		if (is.not(assert.data.type, assert.data.default)) {
			throw PLInputError.CONFL1CT_TYPE(describe(assert));
		}
	}
	if (assert.data.required && !validateAssert(assert.data)) {
		throw PLInputError.INVALID_SCHEM4(describe(assert));
	}
	return assert.data;
}

function parseConfig(assert, config) {
	if (is(Object, assert.data.default)) {
		config.data = module.exports(assert.data.default, config.data);
	}
	if (is(assert.data.type, config.data)) {
		return config.data;
	}
	if ('default' in assert.data || !assert.data.required) {
		return assert.data.default;
	}
	throw PLInputError.UNEXPECTED_TYPE(describe(assert), describe(config));
}

function parseProp(assert, config, node) {
	assert.data = parseAssert(assert, config, node);
	config.data = parseConfig(assert, config);
	return config;
}

module.exports = (patterns, settings) => {
	const object = Object(settings);
	const schema = Object(patterns);
	return Object.keys(schema).reduce((copy, key) => {
		if (key.startsWith('$')) {
			const slug = key.substring(1);
			const assert = { key, data: schema[key] };
			const config = { key: slug, data: object[slug] };
			const result = parseProp(assert, config, copy);
			copy[result.key] = result.data;
		}
		return copy;
	}, Object.create(null));
};
