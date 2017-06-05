import test from 'ava-spec';
import stringify from '../../../lib/loader/stringify';

test('pirate-loader', t => {
	t.is(toString.call(stringify), '[object Function]');
});
