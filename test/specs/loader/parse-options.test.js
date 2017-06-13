import test from 'ava-spec';
import parseOptions from '../../../lib/loader/parse-options';

function sprop(schema, value) {
	return parseOptions({ $foo: schema }, { foo: value }).foo;
}

function throws(msgPrefix, t, schema, value, errorClass) {
	const err = t.throws(() => {
		sprop(schema, value);
	}, errorClass);
	t.is(err.message.indexOf(msgPrefix), 0);
}

function conflictProp(t, schema, value, err) {
	throws('[CONFLICT_TYPE]:', t, schema, value, err);
}

function unexpectedProp(t, schema, value, err) {
	throws('[UNEXPECTED_TYPE]:', t, schema, value, err);
}

function invalidProp(t, schema, value, err) {
	throws('[INVALID_TYPE]:', t, schema, value, err);
}

test('lib/loader/parse-options exists', t => {
	t.is(toString.call(parseOptions), '[object Function]');
});

test('lib/loader/parse-options // simple', t => {
	t.is(sprop([Function, String], 'hello'), 'hello');
	t.is(sprop(String, 'hello'), 'hello');
});

test('lib/loader/parse-options // simple conflicts', t => {
	conflictProp(t, [Function, String], undefined, TypeError);
	conflictProp(t, Function, 'hello', TypeError);
	conflictProp(t, String, undefined, TypeError);
});

test('lib/loader/parse-options // complex', t => {
	t.is(sprop({
		type: [Function, String],
		required: true,
		default: 'My default text',
	}, 'hello'), 'hello');
});

test('lib/loader/parse-options // complex conflicts', t => {
	conflictProp(t, {
		type: [Function, String],
		required: true,
		default: {
			$name: String,
			$limit: Number,
		},
	}, {a: 'hello'}, TypeError);
});
