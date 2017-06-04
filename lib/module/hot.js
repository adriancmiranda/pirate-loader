module.exports = (uid, lib) =>
`//- HMR
var PirateLib = require(${lib});
var PirateModule = require('pirate-loader/lib/module')(__filename__, PirateLib);
if (module.hot) {
	require('pirate-hmr')(${uid}, module, PirateModule);
}
module.exports = PirateModule.exports;
`;
