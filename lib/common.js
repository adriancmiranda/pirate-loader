exports.is = (expected, value, flags) => new RegExp(`(${
		exports.checkInstanceNamesOf(expected)
	})`, flags).test(exports.getInstanceNameOf(value));
;

exports.is.not = (expected, value) =>
	!exports.is(expected, value);
;

exports.getInstanceNameOf = value => {
	const name = Object.prototype.toString.call(value);
	return name === '[object Function]' ?
	Object(value).name || name.slice(8, -1) : (
		name === '[object Object]' ?
		Object(value.constructor).name :
		name.slice(8, -1)
	);
};

exports.getInstanceOf = value =>
	Object(value).constructor
;

exports.checkInstanceNameOf = value =>
	Object(value).name || value || exports.getInstanceNameOf(value)
;

exports.checkInstanceNamesOf = expected => {
	if (Array.isArray(expected)) {
		return expected.map(exports.checkInstanceNameOf).join('|');
	}
	return exports.checkInstanceNameOf(expected);
};
