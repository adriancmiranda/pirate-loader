const { stringify } = require('describe-type');
const escapeRegExp = require('./escape-regexp');

module.exports = (template, variables, open = '{', close = '}') => {
	const o = escapeRegExp(open);
	const f = escapeRegExp(close);
	const tag = new RegExp(`${o}([^${close}]+)${f}`, 'g');
	return variables ? template.replace(tag, (match, key) =>
		stringify(variables[key])
  ) : template;
};
