import test from 'ava-spec';
import options from '../../../lib/loader/options';

test('lib/loader/options', t => {
	t.is(toString.call(options), '[object Function]');
});

// test('lib/loader/options', t => {
// 	t.is(options({
// 		$test: String
// 	}, { test: 'hello' }), 'hello');
// });

// test('lib/loader/options', t => {
// 	t.is(options({
// 		$test: {
// 			type: String,
// 			required: true,
// 			default: 'My default text',
// 		},
// 	}, { test: 'hello' }), 'hello');
// });
