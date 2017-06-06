import test from 'ava-spec';
import ensureModuleExtension from '../../../lib/loader/ensure-module-extension';

test('lib/loader/ensure-module-extension', t => {
	t.is(toString.call(ensureModuleExtension), '[object Function]');
	t.is(ensureModuleExtension('sass?indentedSyntax=true!css!'), 'sass-loader?indentedSyntax=true!css-loader!');
	t.is(ensureModuleExtension('sass?indentedSyntax!css'), 'sass-loader?indentedSyntax!css-loader');
	t.is(ensureModuleExtension('css-loader'), 'css-loader');
	t.is(ensureModuleExtension('css'), 'css-loader');
	t.is(ensureModuleExtension('css!style'), 'css-loader!style-loader');
	t.is(ensureModuleExtension('sass?data!raw?!test?'), 'sass-loader?data!raw-loader?!test-loader?');
	t.is(ensureModuleExtension('sass?data!raw-loader?!test?'), 'sass-loader?data!raw-loader?!test-loader?');
	t.is(ensureModuleExtension('sass?data!raw-loader?!test-loader?'), 'sass-loader?data!raw-loader?!test-loader?');
	t.is(ensureModuleExtension('sass-loader?data!raw-loader?!test-loader?'), 'sass-loader?data!raw-loader?!test-loader?');
});
