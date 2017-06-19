import test from 'ava-spec';
import parseOptions from '../../../lib/data/parse-options';

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

test('lib/data/parse-options exists', t => {
	t.is(toString.call(parseOptions), '[object Function]');
});

test('lib/data/parse-options // simple', t => {
	t.is(sprop([Function, String, undefined], undefined), undefined);
	t.is(sprop([Function, String], 'hello'), 'hello');
	t.is(sprop(String, 'hello'), 'hello');
	t.is(sprop(undefined, undefined), undefined);
	t.is(sprop(null, null), null);
});

test('lib/data/parse-options // simple conflicts', t => {
	throwUnexpectedType(t, undefined, null, TypeError);
	throwUnexpectedType(t, null, undefined, TypeError);
	throwUnexpectedType(t, String, undefined, TypeError);
	throwUnexpectedType(t, String, null, TypeError);
	throwUnexpectedType(t, [Function, String], undefined, TypeError);
	throwUnexpectedType(t, Function, 'hello', TypeError);
	throwUnexpectedType(t, String, undefined, TypeError);
});

test('lib/data/parse-options // complex', t => {
	t.is(sprop({
		type: [Function, String],
		required: true,
		default: 'My default text',
	}, 'hello'), 'hello');

	t.deepEqual(sprop({
		type: [Function, String, Object],
		required: true,
		default: {
			$name: {
				type: String,
				default: 'hey',
			},
			$limit: {
				type: Number,
				default: 2,
			},
			$ext: {
				type: String,
				default: 'pirate'
			},
		},
	}, {}), { name: 'hey', limit: 2, ext: 'pirate' });
});

test('lib/data/parse-options // complex conflicts', t => {
	throwConflictType(t, {
		type: [Function, String],
		required: true,
		default: {
			$name: String,
			$limit: Number,
		},
	}, { name: 'hello', limit: 1 }, TypeError);
});
