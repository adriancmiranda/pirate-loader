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

function throwUnknownSchema(t, schema, value, err) {
	throws('[UNKN0WN_SCHEM4]:', t, schema, value, err);
}

function throwInvalidSchema(t, schema, value, err) {
	throws('[INVALID_SCHEM4]:', t, schema, value, err);
}

function throwRequiredProperty(t, schema, value, err) {
	throws('[REQUIRED_PR0PERTY]:', t, schema, value, err);
}

function throwUnknownType(t, schema, value, err) {
	throws('[UNKN0WN_TYPE]:', t, schema, value, err);
}

function throwInvalidType(t, schema, value, err) {
	throws('[INVALID_TYPE]:', t, schema, value, err);
}

function throwConflictType(t, schema, value, err) {
	throws('[CONFL1CT_TYPE]:', t, schema, value, err);
}

function throwUnexpectedType(t, schema, value, err) {
	throws('[UNEXPECTED_TYPE]:', t, schema, value, err);
}

test('lib/loader/parse-options exists', t => {
	t.is(toString.call(parseOptions), '[object Function]');
	console.log('\n\ntest: \n\n', sprop({
		type: [Function, String, Object],
		required: true,
		default: {
			$name: String,
			$limit: Number,
			$ext: String,
		},
	}, {name: 'hello', limit: 1, ext: 'pirate'}), '\n\n---\n\n');
});

test('lib/loader/parse-options // simple', t => {
	t.is(sprop([Function, String], 'hello'), 'hello');
	t.is(sprop(String, 'hello'), 'hello');
});

test('lib/loader/parse-options // simple conflicts', t => {
	throwUnexpectedType(t, [Function, String], undefined, TypeError);
	throwUnexpectedType(t, Function, 'hello', TypeError);
	throwUnexpectedType(t, String, undefined, TypeError);
});

test('lib/loader/parse-options // complex', t => {
	t.is(sprop({
		type: [Function, String],
		required: true,
		default: 'My default text',
	}, 'hello'), 'hello');
});

test('lib/loader/parse-options // complex conflicts', t => {
	throwConflictType(t, {
		type: [Function, String],
		required: true,
		default: {
			$name: String,
			$limit: Number,
		},
	}, {a: 'hello'}, TypeError);
});
