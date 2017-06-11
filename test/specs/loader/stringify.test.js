import test from 'ava-spec';
import stringify from '../../../lib/loader/stringify';

test('lib/loader/stringify', t => {
	t.is(toString.call(stringify), '[object Function]');
});
