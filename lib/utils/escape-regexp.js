module.exports = pattern =>
	pattern.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
;
