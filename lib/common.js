exports.is = (expected, value) => {
	if (Array.isArray(expected)) {
		expected = expected.map(($) => Object($).name || $).join('|');
	}
	const name = Object(expected).name || expected;
	const type = toString.call(value);
	return new RegExp(`(${name})`).test(type);
};

exports.isEnumerableObject = (value) =>
	value === Object(value);
;
