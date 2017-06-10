function CommonFixture(name) {
	this.name = name;
}

CommonFixture.prototype.toString = function() {
	return '[object Fixture]';
};

module.exports = CommonFixture;
