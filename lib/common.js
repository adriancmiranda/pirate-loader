exports.is = (expected, value, flags) => new RegExp(`(${
		exports.parseInstanceNamesOf(expected)
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

exports.parseInstanceNameOf = value =>
	Object(value).name || value || exports.getInstanceNameOf(value)
;

exports.parseInstanceNamesOf = expected => {
	if (Array.isArray(expected)) {
		return expected.map(exports.parseInstanceNameOf).join('|');
	}
	return exports.parseInstanceNameOf(expected);
};
