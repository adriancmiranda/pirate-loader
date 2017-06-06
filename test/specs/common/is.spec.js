import test from 'ava-spec';
import common from '../../../lib/common';

test('lib/common.is', t => {
	t.is(toString.call(common.is), '[object Function]');
});
