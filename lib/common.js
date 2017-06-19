exports.typeOf = value => {
	const type = Object.prototype.toString.call(value).slice(8, -1);
	return type === 'Object' ? Object(value.constructor).name || 'LightObject' : type;
};

exports.getInstanceNameOf = value => {
	const name = exports.typeOf(value);
	return name === 'Function' ? Object(value).name : name;
};

exports.getInstanceOf = value => {
	if (value === undefined || value === null) {
		return value;
	}
	return Object(value).constructor;
};

exports.writeNameFromType = (value, replace) => {
	const type = exports.typeOf(value);
	if (type === 'Object' || value === undefined || value === null) {
		return type;
	}
	return Object(value).name || (
		replace && type === 'String' ? value :
		exports.getInstanceNameOf(value)
	);
};

exports.typify = (expected, replace) => {
	if (Array.isArray(expected) && expected.length > 0) {
		return expected.map(exports.typify).join('|');
	}
	return exports.writeNameFromType(expected, replace);
};

exports.is = (expected, value, ignoreCase) => {
	return new RegExp(`(${
		exports.typify(expected, true)
	})`, ignoreCase ? 'i' : undefined).test(exports.typeOf(value));
};

exports.is.not = (expected, value, ignoreCase) =>
	!exports.is(expected, value, ignoreCase)
;

exports.stringify = (value, space, replacer) => {
	if (exports.is(RegExp, value)) {
		return value.toString();
	}
	return JSON.stringify(value, replacer, space);
};
