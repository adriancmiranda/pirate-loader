import test from 'ava-spec';
import parseOptions from '../../../lib/loader/parse-options';

function sprop(schema, value) {
	return parseOptions({ $foo: schema }, { foo: value });
}

test('lib/loader/parse-options exists', t => {
	t.is(toString.call(parseOptions), '[object Function]');
});

test('lib/loader/parse-options (simple)', t => {
	t.is(sprop([Function, String], 'hello'), 'hello');
	t.is(sprop(String, 'hello'), 'hello');
	t.is(sprop(Function, 'hello'), 'hello');
});

test('lib/loader/parse-options', t => {
	t.is(sprop({
		type: [Function, String],
		required: true,
		default: 'My default text',
	}, 'hello'), 'hello');
});
