import test from 'ava-spec';
import ensureBang from '../../../lib/loader/ensure-bang';

test('pirate-loader', t => {
	t.is(toString.call(ensureBang), '[object Function]');
});
