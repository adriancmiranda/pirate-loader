/* eslint-disable global-require */
const resolve = require('resolve');

const cwd = process.cwd();

module.exports = module => {
	try {
		return require(resolve.sync(module, { basedir: cwd }));
	} catch (fault) {
		try {
			return require(module);
		} catch (err) {
			return false;
		}
	}
};
