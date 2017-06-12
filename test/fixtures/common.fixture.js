const is = (expected, value) =>
	Object.prototype.toString.call(value).slice(8, -1) === expected
;

const originalName = CommonFixture.name;

function CommonFixture(name) {
	Object.defineProperty(CommonFixture, 'name', {
		value: is('String', name) ? name : originalName,
		writable: true,
		enumerable: true,
		configurable: true,
	});
}

module.exports = CommonFixture;
