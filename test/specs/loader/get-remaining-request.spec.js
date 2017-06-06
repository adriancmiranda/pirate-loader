import test from 'ava-spec';
import getRemainingRequest from '../../../lib/loader/get-remaining-request';

test('lib/loader/get-remaining-request', t => {
	t.is(toString.call(getRemainingRequest), '[object Function]');
});
