const parse = require('./parse');

module.exports = userConfig => parse({
	$context: {
		type: String,
		required: false,
		default: process.cwd(),
	},
	$hashKey: {
		type: String,
		required: false,
	},
	$config: {
		type: String,
		required: false,
		default: 'pirate',
	},
	$extensionName: {
		type: String,
		required: true,
		default: 'pirate',
	},
	$excludedPreLoaders: {
		type: RegExp,
		required: true,
		default: /eslint-loader/,
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
		type: Array,
		required: false,
		default: [],
	},
}, userConfig);
