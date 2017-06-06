exports.is = (expected, value) =>
	new RegExp(`(${expected})`, 'g').test(toString.call(value))
;
