module.exports = task => task.split('!').map(loader =>
	loader.replace(/^([\w-]+)(\?.*)?/, (match, name, query) =>
		(name.endsWith('-loader') ? name : (`${name}-loader`)) + (query || '')
	)
).join('!');
