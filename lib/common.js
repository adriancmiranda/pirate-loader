exports.is = (expected, value) =>
	new RegExp(`(${expected})`, 'g').test(toString.call(value))
;

exports.isEnumerableObject = (value) =>
	value === Object(value);
;
