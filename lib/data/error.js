const { as } = require('describe-type');
const interpolate = require('../utils/interpolate');

module.exports = class PirateLoaderError extends Error {
	constructor(config) {
		const options = Object(config);
		const type = as(String, options.type) || PirateLoaderError.name;
		const template = as(String, options.template) || 'Error #{code}: {message}';
		options.message = as(String, options.message);
		options.code = as(Number, options.code) || null;
		super(interpolate(template, options));
		Object.defineProperty(this, 'name', { value: `${type.replace(/Error$/, '')}Error` });
		Object.defineProperty(this, 'code', { value: options.code });
		Error.captureStackTrace(this, this.constructor);
	}

	static UNKN0WN_SCHEM4(value) {
		return new PirateLoaderError({
			code: 1,
			type: 'UnknownSchema',
			message: 'Unknown {value}',
			value,
		});
	}

	static INVALID_SCHEM4(value) {
		return new PirateLoaderError({
			code: 2,
			type: 'InvalidSchema',
			message: 'Invalid {value}',
			value,
		});
	}

	static REQUIRED_PR0PERTY(value) {
		return new PirateLoaderError({
			code: 3,
			type: 'RequiredProperty',
			message: 'The property x is required {value}',
			value,
		});
	}

	static UNKN0WN_TYPE(value) {
		return new PirateLoaderError({
			code: 4,
			type: 'UnknownType',
			message: 'Unknown type to {value}',
			value,
		});
	}

	static INVALID_TYPE(value) {
		return new PirateLoaderError({
			code: 5,
			type: 'InvalidType',
			message: 'Invalid type to {value}',
			value,
		});
	}

	static CONFL1CT_TYPE(value) {
		return new PirateLoaderError({
			code: 6,
			type: 'ConflictType',
			message: 'The default value doesn\'t match with {value}',
			value,
		});
	}

	static UNEXPECTED_TYPE(value) {
		return new PirateLoaderError({
			code: 7,
			type: 'UnexpectedType',
			message: 'Unexpected type to {value}',
			value,
		});
	}
};
