import test from 'ava-spec';
import ensureModuleExtension from '../../../lib/loader/ensure-module-extension';

test('lib/loader/ensure-module-extension', t => {
	t.is(toString.call(ensureModuleExtension), '[object Function]');
});
