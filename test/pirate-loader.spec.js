import path from 'path';
import test from 'ava-spec';
import webpack from './webpack';
import Text from 'extract-text-webpack-plugin';

test('pirate-loader', t => {
	t.is(toString.call(webpack), '[object Function]');
	webpack.call({
		target: 'web',
		entry: './fixtures/hello.pirate',
		$internal: {
			resourcePath: 'aeaeae',
			minimize: false,
			options: {
				context: 'aeaeaea',
			},
		},
	});
});
