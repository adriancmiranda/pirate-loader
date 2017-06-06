import test from 'ava-spec';
import ensureBang from '../../../lib/loader/ensure-bang';

test('lib/loader/ensure-bang', t => {
	t.is(toString.call(ensureBang), '[object Function]');
});
