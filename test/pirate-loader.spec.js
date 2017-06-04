import path from 'path';
import test from 'ava-spec';
import pirateLoader from '../';

test('pirate-loader', t => {
	t.is(toString.call(pirateLoader), '[object Function]');
});
