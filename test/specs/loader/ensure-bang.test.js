import test from 'ava-spec';
import ensureBang from '../../../lib/loader/ensure-bang';

test('lib/loader/ensure-bang', t => {
	t.is(toString.call(ensureBang), '[object Function]');
	t.is(ensureBang('sass?indentedSyntax=true!css!'), 'sass?indentedSyntax=true!css!');
	t.is(ensureBang('sass?indentedSyntax!css'), 'sass?indentedSyntax!css!');
	t.is(ensureBang('css-loader'), 'css-loader!');
	t.is(ensureBang('css'), 'css!');
	t.is(ensureBang('css!style'), 'css!style!');
});