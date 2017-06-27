const load = require('../../utils/load');

const hasBuble = Boolean(load('buble-loader'));
const hasBabel = Boolean(load('babel-loader'));

console.log('hasBuble:', hasBuble);
console.log('hasBuble:', hasBabel);
