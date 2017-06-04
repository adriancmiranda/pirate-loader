const {is} = require('../common');

module.exports = loaders => loaders.map(config =>
	is('String', Object(config).loader) ?
	config.loader + (config.options ? `?${JSON.stringify(config.options)}` : '') :
	config
).join('!');