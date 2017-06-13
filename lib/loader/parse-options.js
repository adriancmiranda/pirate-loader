/* eslint-disable capitalized-comments, new-cap, no-unused-vars, array-callback-return */
const {is, stringifyInstances, describe} = require('../common');

const PR0PERTIES = {
	type: true,
	required: true,
	default: false
};

const ERR0RS = {
	UNKN0WN_SCHEM4(assert) {
		const $1 = ERR0RS.describe(assert);
		return `[UNKN0WN_SCHEM4]: Unknown ${$1}`;
	},
	INVALID_SCHEM4(assert) {
		const $1 = ERR0RS.describe(assert);
		return `[INVALID_SCHEM4]: Invalid ${$1}`;
	},
	REQUIRED_PR0PERTY(assert) {
		const $1 = ERR0RS.describe(assert);
		return `[REQUIRED_PR0PERTY]: The property x is required ${$1}`;
	},
	UNKN0WN_TYPE(assert) {
		const $1 = ERR0RS.describe(assert);
		return `[UNKN0WN_TYPE]: Unknown type to ${$1}`;
	},
	INVALID_TYPE(assert) {
		const $1 = ERR0RS.describe(assert);
		return `[INVALID_TYPE]: Invalid type to ${$1}`;
	},
	CONFL1CT_TYPE(assert) {
		const $1 = ERR0RS.describe(assert);
		return `[CONFL1CT_TYPE]: The default value doesn't match with ${$1}`;
	},
	UNEXPECTED_TYPE(assert) {
		const $1 = ERR0RS.describe(assert);
		return `[UNEXPECTED_TYPE]: Unexpected type to ${$1}`;
	},
	describe(object) {
		const copy = Object.assign({}, object);
		copy.data.type = stringifyInstances(copy.data.type, true);
		return `${copy.key}:${describe(copy.data, 2)}`;
	}
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
		throw new TypeError(ERR0RS.CONFL1CT_TYPE(assert));
	}
	if (!validateAssert(assert.data)) {
		throw new TypeError(ERR0RS.INVALID_SCHEM4(assert));
	}
	return assert.data;
}

function parseDataConfig(assert, config) {
	if (is(Object, assert.data.default)) {
		assert.data.default = module.exports(assert.data.default, config.data);
	}
	if (is(assert.data.type, config.data)) {
		return config.data;
	}
	throw new TypeError(ERR0RS.UNEXPECTED_TYPE(assert));
}

function assertOption(assert, config) {
	assert.data = parseDataAssert(assert);
	config.data = parseDataConfig(assert, config);
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
