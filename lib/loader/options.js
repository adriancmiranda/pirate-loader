const {is} = require('../common');

module.exports = options => {
	if (Array.isArray(options)) {
		for (let i = 0; i < options.length; i += 1) {
			module.exports(options[i]);
		}
	} else if (Object(options) === options) {
		Object.keys(options).forEach(prop => {
			console.log(prop);
			if (!is('String', options[prop])) {
				module.exports(options[prop]);
			}
		});
	}
};

module.exports.defaults = config => {
	if (Array.isArray(config)) {
		for (let i = 0; i < config.length; i += 1) {
			module.exports.defaults(config[i]);
		}
	} else if (Object(config) === config) {
		Object.keys(config).forEach(prop => {
			console.log(prop);
			if (!is('String', config[prop])) {
				module.exports.defaults(config[prop]);
			}
		});
	}
};
