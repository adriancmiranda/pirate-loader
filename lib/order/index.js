const resolve = require('resolve');

const cwd = process.cwd();

module.exports = modulePath => {
	try {
		return require(resolve.sync(modulePath, {basedir: cwd}));
	} catch (err) {
		try {
			return require(modulePath);
		} catch (err) {}
	}
};

module.exports.getRemainingRequest = require('./get-remaining-request');
