import path from 'path';
import test from 'ava-spec';
import Text from 'extract-text-webpack-plugin';
import webpack from '../webpack';

test('pirate-loader', t => {
	t.is(toString.call(webpack), '[object Function]');
	webpack.test({
		entry: './fixtures/hello.pirate',
	});
});
