const refn = /^\[object\s(\w+)\]/;
const type = $ => Object($).name || $ || toString.call($).replace(refn, '$1');

exports.is = (expected, value) => {
	if (Array.isArray(expected)) {
		expected = expected.map(type).join('|');
	} else {
		expected = type(expected);
	}
	return new RegExp(`(${expected})`).test(toString.call(value));
};

exports.isEnumerableObject = (value) =>
	value === Object(value);
;
