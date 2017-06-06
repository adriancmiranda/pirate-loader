module.exports = loader =>
	loader + (/[^!]$/gi.test(loader) ? '!' : '')
;
