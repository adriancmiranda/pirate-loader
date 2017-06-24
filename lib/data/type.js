const varName = /^[^a-zA-Z_$]|[^\w|$]|[^\w$]$/g;

exports.of = value => {
	const type = Object.prototype.toString.call(value).slice(8, -1);
	const name = type === 'Object' && Object(value.constructor).name;
	const buffer = type === 'Uint8Array' && exports.is.buffer(value) && 'Buffer';
	return name || buffer || type;
};

exports.constructorOf = value => {
	if (value === undefined || value === null) {
		return value;
	}
	return Object(value).constructor || Object;
};

exports.constructorNameOf = value => {
	const name = exports.of(value);
	return (name === 'Function' && Object(value).name) || name;
};

exports.name = (value, replace) => {
	const type = exports.of(value);
	if (type === 'Object' || value === undefined || value === null) {
		return type;
	}
	return Object(value).name || (
		replace && type === 'String' ?
		value.replace(varName, '_') :
		exports.constructorNameOf(value)
	);
};

exports.typify = (expected, replace) => {
	if (Array.isArray(expected) && expected.length > 0) {
		return expected.map(exports.typify).join('|');
	}
	return exports.name(expected, replace);
};

exports.is = (expected, value, ignoreCase) => {
	return new RegExp(`(${
		exports.typify(expected, true)
	})`, ignoreCase ? 'i' : undefined).test(exports.of(value));
};

exports.is.buffer = value => {
	try {
		return exports.constructorOf(value) === Buffer;
	} catch (err) {
		return false;
	}
};

exports.is.not = (expected, value, ignoreCase) =>
	!exports.is(expected, value, ignoreCase)
;

exports.is.not.buffer = value =>
	!exports.is.buffer(value)
;

exports.as = (expected, value, ignoreCase, ...args) => {
	const type = exports.typify(expected, true);
	const fn = new RegExp('\\bFunction\\b', ignoreCase ? 'i' : undefined);
	if (exports.constructorOf(value) === Function && !fn.test(type)) {
		value = value(...args);
	}
	return exports.is(type, value, ignoreCase) ? value : undefined;
};

exports.stringify = (value, space, replacer) => {
	if (exports.constructorOf(value) === RegExp) {
		return value.toString();
	}
	return JSON.stringify(value, replacer, space);
};
