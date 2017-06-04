const is = require('is');

module.exports = loaders => loaders.map(config =>
	is.string(Object(config).loader) ?
	config.loader + (config.options ? `?${JSON.stringify(config.options)}` : '') :
	config
).join('!');
