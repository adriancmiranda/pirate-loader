import test from 'ava-spec';
import uid from '../../../lib/template/uid';

test('lib/template/uid', t => {
	t.is(toString.call(uid), '[object Function]');
});
