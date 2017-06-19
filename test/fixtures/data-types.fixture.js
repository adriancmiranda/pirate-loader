module.exports = [
	// Function
	{
		test: function * () {},
		name: 'GeneratorFunction',
		instance: undefined,
		value: undefined
	},
	{
		test: Function,
		name: 'Function',
		instance: undefined,
		value: undefined
	},

	// Text
	{
		test: String,
		name: 'String',
		instance: undefined,
		value: undefined
	},

	// Regular expression
	{
		test: RegExp,
		name: 'RegExp',
		instance: undefined,
		value: undefined
	},

	// Error
	{
		test: Error,
		name: 'Error',
		instance: undefined,
		value: undefined
	},
	{
		test: TypeError,
		name: 'TypeError',
		instance: undefined,
		value: undefined
	},

	// Numeric
	{
		test: Number,
		name: 'Number',
		instance: undefined,
		value: undefined
	},
	{
		test: Infinity,
		name: 'Infinity', // ??? Infinity|Number
		instance: undefined,
		value: undefined
	},
	{
		test: NaN,
		name: 'NaN', // ??? NaN|Number
		instance: undefined,
		value: undefined
	},

	// Boolean
	{
		test: Boolean,
		name: 'Boolean',
		instance: undefined,
		value: undefined
	},
	{
		test: Boolean(),
		name: 'Boolean',
		instance: undefined,
		value: undefined
	},
	{
		test: Boolean(true),
		name: 'Boolean',
		instance: undefined,
		value: undefined
	},
	{
		test: Boolean(false),
		name: 'Boolean',
		instance: undefined,
		value: undefined
	},
	{
		test: new Boolean(),
		name: 'Boolean',
		instance: undefined,
		value: undefined
	},
	{
		test: new Boolean(true),
		name: 'Boolean',
		instance: undefined,
		value: undefined
	},
	{
		test: new Boolean(false),
		name: 'Boolean',
		instance: undefined,
		value: undefined
	},

	// List
	{
		test: (() => arguments)()),
		name: 'Arguments',
		instance: undefined,
		value: undefined
	},
	{
		test: Array,
		name: 'Array',
		instance: undefined,
		value: undefined
	},
	{
		test: Int8Array,
		name: 'Int8Array',
		instance: undefined,
		value: undefined
	},
	{
		test: Uint8Array,
		name: 'Uint8Array',
		instance: undefined,
		value: undefined
	},
	{
		test: Uint8ClampedArray,
		name: 'Uint8ClampedArray',
		instance: undefined,
		value: undefined
	},
	{
		test: Int16Array,
		name: 'Int16Array',
		instance: undefined,
		value: undefined
	},
	{
		test: Uint16Array,
		name: 'Uint16Array',
		instance: undefined,
		value: undefined
	},
	{
		test: Int32Array,
		name: 'Int32Array',
		instance: undefined,
		value: undefined
	},
	{
		test: Uint32Array,
		name: 'Uint32Array',
		instance: undefined,
		value: undefined
	},
	{
		test: Float32Array,
		name: 'Float32Array',
		instance: undefined,
		value: undefined
	},
	{
		test: Float64Array,
		name: 'Float64Array',
		instance: undefined,
		value: undefined
	},

	// Buffer
	{
		test: Buffer,
		name: '', // !!! Buffer|Uint8Array
		instance: undefined,
		value: undefined
	},
	{
		test: ArrayBuffer,
		name: 'ArrayBuffer',
		instance: undefined,
		value: undefined
	},

	// Object
	{
		test: Object,
		name: 'Object',
		instance: undefined,
		value: undefined
	},
	{
		test: Object.create(null),
		name: 'LightObject', // ???
		instance: undefined,
		value: undefined
	},

	// Map
	{
		test: Map,
		name: 'Map',
		instance: undefined,
		value: undefined
	},
	{
		test: WeakMap,
		name: 'WeakMap',
		instance: undefined,
		value: undefined
	},
	{
		test: WeakSet,
		name: 'WeakSet',
		instance: undefined,
		value: undefined
	},
	{
		test: Set,
		name: 'Set',
		instance: undefined,
		value: undefined
	},
	{
		test: Symbol,
		name: 'Symbol',
		instance: undefined,
		value: undefined
	},

	// Date
	{
		test: Date,
		name: 'Date',
		instance: undefined,
		value: undefined
	},

	// Nil
	{
		test: undefined,
		name: 'Undefined',
		instance: undefined,
		value: undefined
	},
	{
		test: null,
		name: 'Null',
		instance: undefined,
		value: undefined
	},
];
