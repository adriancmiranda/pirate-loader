module.exports = loader =>
	loader + (/[^!]$/g.test(loader) ? '!' : '')
;
