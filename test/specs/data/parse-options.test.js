import test from 'ava';
import parseOptions from '../../../lib/data/parse';
import PLError from '../../../lib/data/error';

function sprop(schema, value) {
	return parseOptions({ $foo: schema }, { foo: value }).foo;
}

function throws(msgPrefix, t, schema, value) {
	const err = t.throws(() => {
		sprop(schema, value);
	}, PLError);
	t.is(err.name, `${msgPrefix}Error`);
}

function throwUnknownSchema(t, schema, value, err) {
	throws('UnknownSchema', t, schema, value, err);
}

function throwInvalidSchema(t, schema, value, err) {
	throws('InvalidSchema', t, schema, value, err);
}

function throwRequiredProperty(t, schema, value, err) {
	throws('RequiredProperty', t, schema, value, err);
}

function throwUnknownType(t, schema, value, err) {
	throws('UnknownType', t, schema, value, err);
}

function throwInvalidType(t, schema, value, err) {
	throws('InvalidType', t, schema, value, err);
}

function throwConflictType(t, schema, value, err) {
	throws('ConflictType', t, schema, value, err);
}

function throwUnexpectedType(t, schema, value, err) {
	throws('UnexpectedType', t, schema, value, err);
}

test('lib/data/parse exists', t => {
	t.is(toString.call(parseOptions), '[object Function]');
});

test('lib/data/parse // simple', t => {
	t.is(sprop([Function, String, undefined], undefined), undefined);
	t.is(sprop([Function, String], 'hello'), 'hello');
	t.is(sprop(String, 'hello'), 'hello');
	t.is(sprop(undefined, undefined), undefined);
	t.is(sprop(null, null), null);
});

test('lib/data/parse // simple conflicts', t => {
	throwUnexpectedType(t, undefined, null);
	throwUnexpectedType(t, null, undefined);
	throwUnexpectedType(t, String, undefined);
	throwUnexpectedType(t, String, null);
	throwUnexpectedType(t, [Function, String], undefined);
	throwUnexpectedType(t, Function, 'hello');
	throwUnexpectedType(t, String, undefined);
});

test('lib/data/parse // complex', t => {
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

test('lib/data/parse // complex conflicts', t => {
	throwConflictType(t, {
		type: [Function, String],
		required: true,
		default: {
			$name: String,
			$limit: Number,
		},
	}, { name: 'hello', limit: 1 });
});
