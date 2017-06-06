import test from 'ava-spec';
import getRemainingRequest from '../../../lib/order/get-remaining-request';

test('lib/order/get-remaining-request', t => {
	t.is(toString.call(getRemainingRequest), '[object Function]');
});
