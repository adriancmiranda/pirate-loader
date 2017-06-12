import test from 'ava-spec';
import parseOptions from '../../../lib/loader/parse-options';

test('lib/loader/parse-options exists', t => {
	t.is(toString.call(parseOptions), '[object Function]');
});

// test('lib/loader/parse-options', t => {
// 	t.is(parseOptions({
// 		$test: String
// 	}, { test: 'hello' }), 'hello');
// });

// test('lib/loader/parse-options', t => {
// 	t.is(parseOptions({
// 		$test: {
// 			type: String,
// 			required: true,
// 			default: 'My default text',
// 		},
// 	}, { test: 'hello' }), 'hello');
// });
