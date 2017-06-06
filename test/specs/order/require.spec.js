import test from 'ava-spec';
import order from '../../../lib/order';

test('lib/order', t => {
	t.is(toString.call(order), '[object Function]');
});
