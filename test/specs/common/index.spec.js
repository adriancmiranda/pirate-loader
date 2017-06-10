import test from 'ava-spec';
import Fixture from '../../fixtures/common.fixture';
import common from '../../../lib/common';

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
});
