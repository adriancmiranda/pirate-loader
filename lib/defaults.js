// Schema
module.exports = {
	$teste: Function,
	$extensionName: {
		type: String,
		required: true,
		default: 'pirate',
	},
	$style: {
		type: Object,
		required: false,
		default: {
			$required: {
				type: Boolean,
				required: false,
				default: false
			},
			$defaultLanguage: {
				type: String,
				required: false,
				default: 'css'
			},
			$tagName: {
				type: String,
				required: false,
				default: 'styles'
			},
			$loaders: {
				type: [Object, Array],
				required: true,
				default: {}
			}
		}
	},
	$script: {
		type: Object,
		required: false,
		default: {
			$required: {
				type: Boolean,
				required: false,
				default: false
			},
			$defaultLanguage: {
				type: String,
				required: false,
				default: 'javascript'
			},
			$tagName: {
				type: String,
				required: false,
				default: 'script'
			},
			$accept: {
				type: String,
				required: false,
				default: 'accept'
			},
			$apply: {
				type: String,
				required: false,
				default: 'apply'
			},
			$loaders: {
				type: [Object, Array],
				required: false,
				default: {}
			}
		}
	},
	$view: {
		type: Object,
		required: false,
		default: {
			$required: {
				type: Boolean,
				required: false,
				default: false
			},
			$defaultLanguage: {
				type: String,
				required: false,
				default: 'html'
			},
			$tagName: {
				type: String,
				required: false,
				default: 'template'
			},
			$loaders: {
				type: [Object, Array],
				required: false,
				default: {}
			}
		}
	}
};
