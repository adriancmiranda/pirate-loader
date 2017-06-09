exports.is = (expected, value) => {
	const type = Object(expected).name || expected;
	return new RegExp(`(${type})`).test(toString.call(value));
};

exports.isEnumerableObject = (value) =>
	value === Object(value);
;
