import test from 'ava-spec';
import ensureModuleExtension from '../../../lib/loader/ensure-module-extension';

test('pirate-loader', t => {
	t.is(toString.call(ensureModuleExtension), '[object Function]');
});
