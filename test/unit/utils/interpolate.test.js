import test from 'ava';
import interpolate from '../../../lib/utils/interpolate';

test('lib/utils/interpolate', t => {
	t.is(toString.call(interpolate), '[object Function]');
	t.is(interpolate('Error #{code}: {message}', {
		code: 500,
		message: 'Internal Error',
		place: 'server',
	}), 'Error #500: Internal Error');
});
