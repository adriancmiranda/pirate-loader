import test from 'ava-spec';
import Fixture from '../../fixtures/common.fixture';
import common from '../../../lib/common';

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
	t.is(common.typeOf(Fixture), 'Function');
	t.is(common.typeOf(new Fixture('test')), 'Object');
	t.is(common.typeOf(new Buffer('ab')), 'Uint8Array');
	t.is(common.typeOf(new Date()), 'Date');
});

test.todo('[lib/common.getNameFromType]: Choose a better name for this function');
test('lib/common.getNameFromType', t => {
	t.is(toString.call(common.getNameFromType), '[object Function]');
	t.is(common.getNameFromType(Symbol), 'Symbol');
	t.is(common.getNameFromType(String), 'String');
	t.is(common.getNameFromType(RegExp), 'RegExp');
	t.is(common.getNameFromType(Number), 'Number');
	t.is(common.getNameFromType(TypeError), 'TypeError');
	t.is(common.getNameFromType(Error), 'Error');
	t.is(common.getNameFromType(Object), 'Object');
	t.is(common.getNameFromType(Array), 'Array');
	t.is(common.getNameFromType(Boolean), 'Boolean');
	t.is(common.getNameFromType(Buffer), 'Buffer');
	t.is(common.getNameFromType(Date), 'Date');
	t.is(common.getNameFromType(null), 'Null');
	t.is(common.getNameFromType(undefined), 'Undefined');
	t.is(common.getNameFromType(NaN), 'Number');
	t.is(common.getNameFromType('ab|ba'), 'ab|ba');
	t.is(common.getNameFromType(new Fixture('test')), 'test');
	t.is(common.getNameFromType(Fixture), 'CommonFixture');
	t.is(common.getNameFromType([1, 2]), 'Array');
	t.is(common.getNameFromType(/^./g), 'RegExp');
	t.is(common.getNameFromType(10000), 'Number');
	t.is(common.getNameFromType({name: 1}), 1);
	t.is(common.getNameFromType(false), 'Boolean');
	t.is(common.getNameFromType(new Date()), 'Date');
	t.is(common.getNameFromType(new Buffer('ab')), 'Uint8Array');
});

test('lib/common.stringifyInstances', t => {
	t.is(toString.call(common.stringifyInstances), '[object Function]');
	t.is(common.stringifyInstances([Symbol, String]), 'Symbol|String');
	t.is(common.stringifyInstances('Symbol|String'), 'Symbol|String');
	t.is(common.stringifyInstances([1, 'Custom']), 'Number|Custom');
});

test('lib/common.getInstanceNameOf', t => {
	t.is(toString.call(common.getInstanceNameOf), '[object Function]');
	t.is(common.getInstanceNameOf(Symbol), 'Symbol');
	t.is(common.getInstanceNameOf(String), 'String');
	t.is(common.getInstanceNameOf(RegExp), 'RegExp');
	t.is(common.getInstanceNameOf(Number), 'Number');
	t.is(common.getInstanceNameOf(TypeError), 'TypeError');
	t.is(common.getInstanceNameOf(Error), 'Error');
	t.is(common.getInstanceNameOf(Object), 'Object');
	t.is(common.getInstanceNameOf(Array), 'Array');
	t.is(common.getInstanceNameOf(Boolean), 'Boolean');
	t.is(common.getInstanceNameOf(Buffer), 'Buffer');
	t.is(common.getInstanceNameOf(Date), 'Date');
	t.is(common.getInstanceNameOf(null), 'Null');
	t.is(common.getInstanceNameOf(undefined), 'Undefined');
	t.is(common.getInstanceNameOf(NaN), 'Number');
	t.is(common.getInstanceNameOf('ab|ba'), 'String');
	t.is(common.getInstanceNameOf(new Fixture('test')), 'CommonFixture');
	t.is(common.getInstanceNameOf(Fixture), 'CommonFixture');
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
	t.is(common.getInstanceOf(new Fixture('test')), Fixture);
	t.is(common.getInstanceOf(Fixture), Function);
	t.is(common.getInstanceOf(false), Boolean);
	t.is(common.getInstanceOf(new Uint8Array()), Uint8Array);
});

test('lib/common.is', t => {
	t.is(toString.call(common.is), '[object Function]');
	t.is(common.is('String|Function', 'pirate'), true);
	t.is(common.is([String, Function], 'pirate'), true);
	t.is(common.is('String|Function', () => 'pirate'), true);
	t.is(common.is([String, Function], () => 'pirate'), true);
	t.is(common.is('Function', () => 'pirate'), true);
	t.is(common.is(Function, () => 'pirate'), true);
	t.is(common.is('String', () => 'pirate'), false);
	t.is(common.is(String, () => 'pirate'), false);
	t.is(common.is(Fixture, new Fixture('pirate')), true);
	t.is(common.is('Fixture', new Fixture('pirate')), true);
	t.is(common.is(undefined, undefined), true);
	t.is(common.is('undefined', undefined, true), true);
	t.is(common.is('Undefined', undefined), true);
	t.is(common.is(null, null), true);
	t.is(common.is('null', null, true), true);
	t.is(common.is('Null', null), true);
	t.is(common.is(NaN, NaN), true);
	t.is(common.is('Number', NaN), true);
});

test('lib/common.is.not', t => {
	t.is(toString.call(common.is.not), '[object Function]');
	t.is(common.is.not('String|Function', 'pirate'), false);
	t.is(common.is.not([String, Function], 'pirate'), false);
	t.is(common.is.not('String|Function', () => 'pirate'), false);
	t.is(common.is.not([String, Function], () => 'pirate'), false);
	t.is(common.is.not('Function', () => 'pirate'), false);
	t.is(common.is.not(Function, () => 'pirate'), false);
	t.is(common.is.not('String', () => 'pirate'), true);
	t.is(common.is.not(String, () => 'pirate'), true);
	t.is(common.is.not(Fixture, new Fixture('pirate')), false);
	t.is(common.is.not('Fixture', new Fixture('pirate')), false);
	t.is(common.is.not(undefined, undefined), false);
	t.is(common.is.not('undefined', undefined, true), false);
	t.is(common.is.not('Undefined', undefined), false);
	t.is(common.is.not(null, null), false);
	t.is(common.is.not('null', null, true), false);
	t.is(common.is.not('Null', null), false);
	t.is(common.is.not(NaN, NaN), false);
	t.is(common.is.not('Number', NaN), false);
});
