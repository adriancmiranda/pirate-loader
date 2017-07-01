module.exports = {
	$context: {
		type: String,
		required: false,
		default: process.cwd(),
	},
	$hashKey: {
		type: String,
		required: false,
	},
	$extensionName: {
		type: String,
		required: true,
		default: 'pirate',
	},
	$preLoaders: {
		type: Object,
		required: false,
		default: {},
	},
	$postLoaders: {
		type: Object,
		required: false,
		default: {},
	},
	$excludedPreLoaders: {
		type: RegExp,
		required: true,
		default: /eslint-loader/,
	},
	$buble: {
		type: Object,
		required: false,
		default: {},
	},
	$style: {
		type: Object,
		required: false,
		default: {
			$required: {
				type: Boolean,
				required: false,
				default: false,
			},
			$extract: {
				type: Boolean,
				required: false,
				default: false,
			},
			$sourceMap: {
				type: Boolean,
				required: false,
				default: false,
			},
			$defaultLanguage: {
				type: String,
				required: false,
				default: 'css',
			},
			$tagName: {
				type: String,
				required: false,
				default: 'style',
			},
			$modules: {
				type: Object,
				required: false,
				default: {},
			},
			$loaders: {
				type: [Object, Array],
				required: true,
				default: {},
			},
		},
	},
	$script: {
		type: Object,
		required: false,
		default: {
			$required: {
				type: Boolean,
				required: false,
				default: false,
			},
			$esnext: {
				type: Boolean,
				required: false,
				default: false,
			},
			$buble: {
				type: [Object, undefined],
				required: false,
				default: undefined,
			},
			$defaultLanguage: {
				type: String,
				required: false,
				default: 'javascript',
			},
			$tagName: {
				type: String,
				required: false,
				default: 'script',
			},
			$accept: {
				type: String,
				required: false,
				default: 'accept',
			},
			$apply: {
				type: String,
				required: false,
				default: 'apply',
			},
			$loaders: {
				type: [Object, Array],
				required: false,
				default: {},
			},
		},
	},
	$view: {
		type: Object,
		required: false,
		default: {
			$required: {
				type: Boolean,
				required: false,
				default: false,
			},
			$buble: {
				type: [Object, undefined],
				required: false,
				default: undefined,
			},
			$transformToRequire: {
				type: Boolean,
				required: false,
				default: false,
			},
			$preserveWhitespace: {
				type: Boolean,
				required: false,
				default: false,
			},
			$compilerModules: {
				type: [String, undefined],
				required: false,
				default: undefined,
			},
			$defaultLanguage: {
				type: String,
				required: false,
				default: 'html',
			},
			$tagName: {
				type: String,
				required: false,
				default: 'view',
			},
			$loaders: {
				type: [Object, Array],
				required: false,
				default: {},
			},
		},
	},
	$customTags: {
		type: Object,
		required: false,
		default: {},
	},
};
