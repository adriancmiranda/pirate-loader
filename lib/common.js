const extractInstanceName = value => toString.call(value).slice(8, -1);

exports.getNameOf = value => {
	if (value === undefined || value === null) {
		return extractInstanceName(value);
	}
	return Object(value).name || value || exports.getInstanceNameOf(value)
};

exports.stringifyInstances = expected => {
	if (Array.isArray(expected)) {
		return expected.map(exports.getNameOf).join('|');
	}
	return exports.getNameOf(expected);
};

exports.getInstanceNameOf = value => {
	const name = extractInstanceName(value);
	return name === 'Function' ? Object(value).name || name : (
		name === 'Object' ? Object(value.constructor).name : name
	);
};

exports.getInstanceOf = value => {
	if (nil.test(value)) {
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
