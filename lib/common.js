exports.typeOf = value => {
	const type = Object.prototype.toString.call(value).slice(8, -1);
	return type === 'Object' ? Object(value.constructor).name : type;
};

exports.writeNameFromType = (value, write) => {
	if (value === undefined || value === null) {
		return exports.typeOf(value);
	}
	return Object(value).name || (
		exports.typeOf(value) === 'String' && write ?
		value : exports.getInstanceNameOf(value)
	);
};

exports.stringifyInstances = expected => {
	if (Array.isArray(expected)) {
		return expected.map(exports.writeNameFromType).join('|');
	}
	return exports.writeNameFromType(expected, 1);
};

exports.getInstanceNameOf = value => {
	const name = exports.typeOf(value);
	return name === 'Function' ? Object(value).name : name;
};

exports.getInstanceOf = value => {
	if (value === undefined || value === null) {
		return value;
	}
	return Object(value).constructor;
};

exports.is = (expected, value, ignoreCase) => {
	return new RegExp(`(${
		exports.stringifyInstances(expected)
	})`, ignoreCase ? 'i' : undefined).test(exports.typeOf(value));
};

exports.is.not = (expected, value, ignoreCase) =>
	!exports.is(expected, value, ignoreCase)
;
