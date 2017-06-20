const data = require('../../data');

const hasBuble = Boolean(data.load('buble-loader'));
const hasBabel = Boolean(data.load('babel-loader'));

console.log('hasBuble:', hasBuble);
console.log('hasBuble:', hasBabel);
