exports.typeOf = value =>
	Object.prototype.toString.call(value).slice(8, -1)
;

exports.getNameOf = value => {
	const name = Object(value).name;
	if (value === undefined || value === null) {
		return exports.typeOf(value);
	}
	return name || (
		exports.typeOf(value) === 'String' ? value : 0
	) || exports.getInstanceNameOf(value)
};

exports.stringifyInstances = expected => {
	if (Array.isArray(expected)) {
		return expected.map(exports.getNameOf).join('|');
	}
	return exports.getNameOf(expected);
};

exports.getInstanceNameOf = value => {
	const name = exports.typeOf(value);
	return name === 'Function' ? Object(value).name || name : (
		name === 'Object' ? Object(value.constructor).name : name
	);
};

exports.getInstanceOf = value => {
	if (value === undefined || value === null) {
		return value;
	}
	return Object(value).constructor;
};

exports.is = (expected, value, ignoreCase) => new RegExp(`(${
	exports.stringifyInstances(expected)
})`, ignoreCase ? 'i' : undefined).test(exports.getInstanceNameOf(value));

exports.is.not = (expected, value, ignoreCase) =>
	!exports.is(expected, value, ignoreCase)
;
