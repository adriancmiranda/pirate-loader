import test from 'ava-spec';
import webpack from '../webpack';

test('pirate-loader', t => {
	t.is(toString.call(webpack), '[object Function]');
	t.is(toString.call(webpack.test), '[object Function]');
	t.is(toString.call(webpack.call), '[object Function]');
	t.is(toString.call(webpack.config), '[object Object]');
	webpack.call({
		entry: './fixtures/hello.pirate',
	}).then((response) => {
		console.log('response:', response.output);
	}).catch(console.error.bind(console, '[pirate-loader] SpecError:'));
});
