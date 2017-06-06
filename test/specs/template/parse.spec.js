import test from 'ava-spec';
import parse from '../../../lib/template/parse';

test('lib/template/parse', t => {
	t.is(toString.call(parse), '[object Function]');
});

test('lib/template/parse.sourceMap', t => {
	t.is(toString.call(parse.sourceMap), '[object Function]');
});
