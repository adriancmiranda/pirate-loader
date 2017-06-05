import test from 'ava-spec';
import webpack from '../webpack';

test('pirate-loader', t => {
	t.is(toString.call(webpack), '[object Function]');
	webpack.test({
		entry: './fixtures/hello.pirate',
	});
});
