import test from 'ava-spec';
import options from '../../../lib/loader/options';

test('lib/loader/options', t => {
	t.is(toString.call(options), '[object Function]');
	console.log(options({
		$test: String,
	}, { test: 'hello' }));
});
