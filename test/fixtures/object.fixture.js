const is = (expected, value) =>
	Object.prototype.toString.call(value).slice(8, -1) === expected
;

const originalName = ObjectFixture.name;

function ObjectFixture(name) {
	Object.defineProperty(ObjectFixture, 'name', {
		value: is('String', name) ? name : originalName,
		writable: true,
		enumerable: true,
		configurable: true,
	});
}

module.exports = ObjectFixture;
