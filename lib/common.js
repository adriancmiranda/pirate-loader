const parseInstanceNameOf = value =>
	Object(value).name || value || exports.getInstanceNameOf(value)
;

exports.stringifyInstances = expected => {
	if (Array.isArray(expected)) {
		return expected.map(parseInstanceNameOf).join('|');
	}
	return parseInstanceNameOf(expected);
};

exports.is = (expected, value, flags) => new RegExp(`(${
		exports.stringifyInstances(expected)
	})`, flags).test(exports.getInstanceNameOf(value));
;

exports.is.not = (expected, value) =>
	!exports.is(expected, value);
;

exports.getInstanceNameOf = value => {
	const name = Object.prototype.toString.call(value).slice(8, -1);
	return name === 'Function' ? Object(value).name || name : (
		name === 'Object' ? Object(value.constructor).name : name
	);
};

exports.getInstanceOf = value =>
	Object(value).constructor
;
