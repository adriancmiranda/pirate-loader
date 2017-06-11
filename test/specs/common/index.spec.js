import test from 'ava-spec';
import Fixture from '../../fixtures/common.fixture';
import common from '../../../lib/common';

test('lib/common.extractInstanceName', t => {
	t.is(toString.call(common.extractInstanceName), '[object Function]');
});

test('lib/common.getNameOf', t => {
	t.is(toString.call(common.getNameOf), '[object Function]');
});

test('lib/common.stringifyInstances', t => {
	t.is(toString.call(common.stringifyInstances), '[object Function]');
});

test('lib/common.getInstanceNameOf', t => {
	t.is(toString.call(common.getInstanceNameOf), '[object Function]');
});

test('lib/common.getInstanceOf', t => {
	t.is(toString.call(common.getInstanceOf), '[object Function]');
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
