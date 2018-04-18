const { is } = require('describe-type');

module.exports = function stringify(value, space, replacer) {
	if (is([RegExp, Function, String], value)) {
		return value.toString();
	}
	return JSON.stringify(value, replacer, space);
};
