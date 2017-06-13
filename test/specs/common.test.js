import test from 'ava-spec';
import Fixture from '../fixtures/common.fixture';
import common from '../../lib/common';

test('lib/common.typeOf', t => {
	t.is(toString.call(common.typeOf), '[object Function]');
	t.is(common.typeOf('ab'), 'String');
	t.is(common.typeOf(/^./g), 'RegExp');
	t.is(common.typeOf(10000), 'Number');
	t.is(common.typeOf({name: 1}), 'Object');
	t.is(common.typeOf([1, 2]), 'Array');
	t.is(common.typeOf(false), 'Boolean');
	t.is(common.typeOf(null), 'Null');
	t.is(common.typeOf(undefined), 'Undefined');
	t.is(common.typeOf(String), 'Function');
	t.is(common.typeOf(Boolean), 'Function');
	t.is(common.typeOf(Symbol), 'Function');
	t.is(common.typeOf(Number), 'Function');
	t.is(common.typeOf(RegExp), 'Function');
	t.is(common.typeOf(TypeError), 'Function');
	t.is(common.typeOf(Error), 'Function');
	t.is(common.typeOf(Object), 'Function');
	t.is(common.typeOf(Array), 'Function');
	t.is(common.typeOf(Boolean), 'Function');
	t.is(common.typeOf(Buffer), 'Function');
	t.is(common.typeOf(Date), 'Function');
	t.is(common.typeOf(Fixture), 'Function');
	t.is(common.typeOf(new Fixture()), 'CommonFixture');
	t.is(common.typeOf(new Buffer('ab')), 'Uint8Array');
	t.is(common.typeOf(new Date()), 'Date');
});

test('lib/common.writeNameFromType', t => {
	t.is(toString.call(common.writeNameFromType), '[object Function]');
	t.is(common.writeNameFromType(Symbol), 'Symbol');
	t.is(common.writeNameFromType(String), 'String');
	t.is(common.writeNameFromType(RegExp), 'RegExp');
	t.is(common.writeNameFromType(Number), 'Number');
	t.is(common.writeNameFromType(TypeError), 'TypeError');
	t.is(common.writeNameFromType(Error), 'Error');
	t.is(common.writeNameFromType(Object), 'Object');
	t.is(common.writeNameFromType(Array), 'Array');
	t.is(common.writeNameFromType(Boolean), 'Boolean');
	t.is(common.writeNameFromType(Buffer), 'Buffer');
	t.is(common.writeNameFromType(Date), 'Date');
	t.is(common.writeNameFromType(null), 'Null');
	t.is(common.writeNameFromType(undefined), 'Undefined');
	t.is(common.writeNameFromType(NaN), 'Number');
	t.is(common.writeNameFromType('ab|ba', true), 'ab|ba');
	t.is(common.writeNameFromType('ab|ba'), 'String');
	t.is(common.writeNameFromType(new Fixture('FixtureTest')), 'FixtureTest');
	t.is(common.writeNameFromType(Fixture), 'FixtureTest');
	t.is(common.writeNameFromType([1, 2]), 'Array');
	t.is(common.writeNameFromType(/^./g), 'RegExp');
	t.is(common.writeNameFromType(10000), 'Number');
	t.is(common.writeNameFromType({name: 1}), 'Object');
	t.is(common.writeNameFromType(false), 'Boolean');
	t.is(common.writeNameFromType(new Date()), 'Date');
	t.is(common.writeNameFromType(new Buffer('ab')), 'Uint8Array');
});

test('lib/common.stringifyInstances', t => {
	t.is(toString.call(common.stringifyInstances), '[object Function]');
	t.is(common.stringifyInstances([Symbol, String, Function, Object, Boolean]), 'Symbol|String|Function|Object|Boolean');
	t.is(common.stringifyInstances([Symbol, String, Function, Object, Boolean,]), 'Symbol|String|Function|Object|Boolean'); // should be 'Symbol|String|Function|Object|Boolean|Undefined'
	t.is(common.stringifyInstances('Symbol|String|Function|Object|Boolean', true), 'Symbol|String|Function|Object|Boolean');
	t.is(common.stringifyInstances([1, 'Custom', {}]), 'Number|Custom|Object'); // <- should it be an array?
	t.is(common.stringifyInstances([]), 'Array');
	t.is(common.stringifyInstances(1), 'Number');
	t.is(common.stringifyInstances('Custom', true), 'Custom');
	t.is(common.stringifyInstances({}), 'Object');
	t.is(common.stringifyInstances({name: 1}), 'Object');
	t.is(common.stringifyInstances(/^./g), 'RegExp');
	t.is(common.stringifyInstances(false), 'Boolean');
	t.is(common.stringifyInstances(new Date()), 'Date');
	t.is(common.stringifyInstances(Date), 'Date');
	t.is(common.stringifyInstances(new Buffer('ab')), 'Uint8Array');
	t.is(common.stringifyInstances(Buffer), 'Buffer');
});

test('lib/common.getInstanceNameOf', t => {
	t.is(toString.call(common.getInstanceNameOf), '[object Function]');
	t.is(common.getInstanceNameOf(Symbol), 'Symbol');
	t.is(common.getInstanceNameOf(Symbol.name), 'String');
	t.is(common.getInstanceNameOf(String), 'String');
	t.is(common.getInstanceNameOf(String.name), 'String');
	t.is(common.getInstanceNameOf(RegExp), 'RegExp');
	t.is(common.getInstanceNameOf(RegExp.name), 'String');
	t.is(common.getInstanceNameOf(Number), 'Number');
	t.is(common.getInstanceNameOf(Number.name), 'String');
	t.is(common.getInstanceNameOf(TypeError), 'TypeError');
	t.is(common.getInstanceNameOf(TypeError.name), 'String');
	t.is(common.getInstanceNameOf(Error), 'Error');
	t.is(common.getInstanceNameOf(Error.name), 'String');
	t.is(common.getInstanceNameOf(Object), 'Object');
	t.is(common.getInstanceNameOf(Object.name), 'String');
	t.is(common.getInstanceNameOf(Array), 'Array');
	t.is(common.getInstanceNameOf(Array.name), 'String');
	t.is(common.getInstanceNameOf(Boolean), 'Boolean');
	t.is(common.getInstanceNameOf(Boolean.name), 'String');
	t.is(common.getInstanceNameOf(Buffer), 'Buffer');
	t.is(common.getInstanceNameOf(Buffer.name), 'String');
	t.is(common.getInstanceNameOf(Date), 'Date');
	t.is(common.getInstanceNameOf(Date.name), 'String');
	t.is(common.getInstanceNameOf(null), 'Null');
	t.is(common.getInstanceNameOf(undefined), 'Undefined');
	t.is(common.getInstanceNameOf(NaN), 'Number');
	t.is(common.getInstanceNameOf(NaN.name), 'Undefined');
	t.is(common.getInstanceNameOf('ab|ba'), 'String');
	t.is(common.getInstanceNameOf(new Fixture()), 'CommonFixture');
	t.is(common.getInstanceNameOf(Fixture), 'CommonFixture');
	t.is(common.getInstanceNameOf(Fixture.name), 'String');
	t.is(common.getInstanceNameOf([1, 2]), 'Array');
	t.is(common.getInstanceNameOf(/^./g), 'RegExp');
	t.is(common.getInstanceNameOf(10000), 'Number');
	t.is(common.getInstanceNameOf({name: 1}), 'Object');
	t.is(common.getInstanceNameOf(false), 'Boolean');
	t.is(common.getInstanceNameOf(new Date()), 'Date');
	t.is(common.getInstanceNameOf(new Buffer('ab')), 'Uint8Array');
});

test('lib/common.getInstanceOf', t => {
	t.is(toString.call(common.getInstanceOf), '[object Function]');
	t.is(common.getInstanceOf(Symbol('foo')), Symbol);
	t.is(common.getInstanceOf(new String()), String);
	t.is(common.getInstanceOf(new RegExp('^foo')), RegExp);
	t.is(common.getInstanceOf(/^./g), RegExp);
	t.is(common.getInstanceOf(new TypeError('foo')), TypeError);
	t.is(common.getInstanceOf(new Error('foo')), Error);
	t.is(common.getInstanceOf(new Object()), Object);
	t.is(common.getInstanceOf({name: 1}), Object);
	t.is(common.getInstanceOf(new Array()), Array);
	t.is(common.getInstanceOf([1, 2]), Array);
	t.is(common.getInstanceOf(new Boolean()), Boolean);
	t.is(common.getInstanceOf(new Buffer('1234')), Buffer);
	t.is(common.getInstanceOf(new Date()), Date);
	t.is(common.getInstanceOf(null), null);
	t.is(common.getInstanceOf(undefined), undefined);
	t.is(common.getInstanceOf(NaN), Number);
	t.is(common.getInstanceOf(10000), Number);
	t.is(common.getInstanceOf('ab|ba'), String);
	t.is(common.getInstanceOf(new Fixture('FF')), Fixture);
	t.is(common.getInstanceOf(Fixture), Function);
	t.is(common.getInstanceOf(false), Boolean);
	t.is(common.getInstanceOf(new Uint8Array()), Uint8Array);
});

test('lib/common.is', t => {
	t.is(toString.call(common.is), '[object Function]');
	t.is(common.is('Function|Array', String), true);
	t.is(common.is('Function|Array', []), true);
	t.is(common.is('Function|Array', () => []), true);
	t.is(common.is('String|Function', 'pirate'), true);
	t.is(common.is([String, Function, Object, Boolean], 'pirate'), true);
	t.is(common.is([String.name, Function.name], 'pirate'), true);
	t.is(common.is('String|Function', () => 'pirate'), true);
	t.is(common.is([String, Function], () => 'pirate'), true);
	t.is(common.is([String.name, Function.name], () => 'pirate'), true);
	t.is(common.is('Function', () => 'pirate'), true);
	t.is(common.is(Function, () => 'pirate'), true);
	t.is(common.is(Function.name, () => 'pirate'), true);
	t.is(common.is('String', () => 'pirate'), false);
	t.is(common.is(String, () => 'pirate'), false);
	t.is(common.is(String.name, () => 'pirate'), false);
	t.is(common.is(Fixture, new Fixture('pirate')), true);
	t.is(common.is(Fixture.name, new Fixture('pirate')), true);
	t.is(common.is('Pirate', new Fixture('Pirate')), true);
	t.is(common.is(undefined, undefined), true);
	t.is(common.is('undefined', undefined, true), true);
	t.is(common.is('Undefined', undefined), true);
	t.is(common.is(null, null), true);
	t.is(common.is('null', null, true), true);
	t.is(common.is('Null', null), true);
	t.is(common.is(NaN, NaN), true);
	t.is(common.is(Number, NaN), true);
	t.is(common.is(Number.name, NaN), true);
	t.is(common.is('Number', NaN), true);
});

test('lib/common.is.not', t => {
	t.is(toString.call(common.is.not), '[object Function]');
	t.is(common.is.not('Function|Array', String), false);
	t.is(common.is.not('Function|Array', []), false);
	t.is(common.is.not('Function|Array', () => []), false);
	t.is(common.is.not('String|Function', 'pirate'), false);
	t.is(common.is.not([String, Function, Object, Boolean], 'pirate'), false);
	t.is(common.is.not([String.name, Function.name], 'pirate'), false);
	t.is(common.is.not('String|Function', () => 'pirate'), false);
	t.is(common.is.not([String, Function], () => 'pirate'), false);
	t.is(common.is.not([String.name, Function.name], () => 'pirate'), false);
	t.is(common.is.not('Function', () => 'pirate'), false);
	t.is(common.is.not(Function, () => 'pirate'), false);
	t.is(common.is.not(Function.name, () => 'pirate'), false);
	t.is(common.is.not('String', () => 'pirate'), true);
	t.is(common.is.not(String, () => 'pirate'), true);
	t.is(common.is.not(String.name, () => 'pirate'), true);
	t.is(common.is.not(Fixture, new Fixture('pirate')), false);
	t.is(common.is.not(Fixture.name, new Fixture('pirate')), false);
	t.is(common.is.not('CommonFixture', new Fixture()), false);
	t.is(common.is.not(undefined, undefined), false);
	t.is(common.is.not('undefined', undefined, true), false);
	t.is(common.is.not('Undefined', undefined), false);
	t.is(common.is.not(null, null), false);
	t.is(common.is.not('null', null, true), false);
	t.is(common.is.not('Null', null), false);
	t.is(common.is.not(NaN, NaN), false);
	t.is(common.is.not(Number, NaN), false);
	t.is(common.is.not(Number.name, NaN), false);
	t.is(common.is.not('Number', NaN), false);
});
