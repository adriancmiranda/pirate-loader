exports.types = [
	// Function
	{ value: function * () {}, name: 'GeneratorFunction' },
	{ value: Function, name: 'Function' },

	// Text
	{ value: String, name: 'String' },

	// Regular expression
	{ value: RegExp, name: 'RegExp' },

	// Error
	{ value: Error, name: 'Error' },
	{ value: TypeError, name: 'TypeError' },

	// Numeric
	{ value: Number, name: 'Number' },
	{ value: Infinity, name: 'Infinity' }, // ??? Infinity|Number
	{ value: NaN, name: 'NaN' }, // ??? NaN|Number

	// Boolean
	{ value: Boolean, name: 'Boolean' },

	// List
	{ value: (() => arguments)()), name: 'Arguments' },
	{ value: Array, name: 'Array' },
	{ value: Int8Array, name: 'Int8Array' },
	{ value: Uint8Array, name: 'Uint8Array' },
	{ value: Uint8ClampedArray, name: 'Uint8ClampedArray' },
	{ value: Int16Array, name: 'Int16Array' },
	{ value: Uint16Array, name: 'Uint16Array' },
	{ value: Int32Array, name: 'Int32Array' },
	{ value: Uint32Array, name: 'Uint32Array' },
	{ value: Float32Array, name: 'Float32Array' },
	{ value: Float64Array, name: 'Float64Array' },

	// Buffer
	{ value: Buffer, name: '' }, // !!! Buffer|Uint8Array
	{ value: ArrayBuffer, name: 'ArrayBuffer' },

	// Object
	{ value: Object, name: 'Object' },
	{ value: Object.create(null), name: 'LightObject' }, // ???

	// Map
	{ value: Map, name: 'Map' },
	{ value: WeakMap, name: 'WeakMap' },
	{ value: WeakSet, name: 'WeakSet' },
	{ value: Set, name: 'Set' },
	{ value: Symbol, name: 'Symbol' },

	// Date
	{ value: Date, name: 'Date' },

	// Nil
	{ value: undefined, name: 'Undefined' },
	{ value: null, name: 'Null' },
];
