exports.typeOf = value => {
	const type = Object.prototype.toString.call(value).slice(8, -1);
	return type === 'Object' ? Object(value.constructor).name : type;
};

exports.writeNameFromType = (value, replace) => {
	const type = exports.typeOf(value);
	if (value === undefined || value === null) {
		return type;
	}
	return (type === 'Object' ? type : Object(value).name) || (
		replace && exports.typeOf(value) === 'String' ? value :
		exports.getInstanceNameOf(value)
	);
};

exports.stringifyInstances = (expected, replace = true) => {
	if (Array.isArray(expected) && expected.length > 0) {
		return expected.map(exports.stringifyInstances).join('|');
	}
	return exports.writeNameFromType(expected, replace);
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
