import test from 'ava-spec';
import order from '../../../lib/loader/load';

test('lib/loader/load', t => {
	t.is(toString.call(order), '[object Function]');
});
