const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const cheerio = require('cheerio');
const deepExtend = require('deep-extend');
const pirateLoader = require('..');

const mfs = new MemoryFS();

module.exports = (options) => {
	const testConfig = Object(options);
	const pirateConfig = testConfig.pirateLoader;
	delete testConfig.pirateLoader;
	delete testConfig.$internal;
	return new Promise((resolve, reject) => {
		const config = deepExtend({}, module.exports.config, testConfig);
		const loaderOptions = new webpack.LoaderOptionsPlugin({ pirateLoader: pirateConfig  });
		const plugins = (config.plugins || []).concat(loaderOptions);
		const compiler = webpack(deepExtend(pirateConfig ? { plugins } : {}, config));
		const outputFilename = path.posix.join(compiler.options.output.path, compiler.options.output.filename);
		compiler.outputFileSystem = mfs;
		compiler.run((err, stats) => {
			const warnings = stats.compilation.warnings;
			const errors = stats.compilation.errors;
			if (err || errors.length) {
				reject(err ? [err] : errors);
			} else {
				resolve({ content: mfs.readFileSync(outputFilename).toString(), warnings });
			}
		});
	});
};

module.exports.config = {
	context: path.join(__dirname, '.'),
	output: {
		path: '/',
		filename: 'fixtures.bundle.js',
	},
	module: {
		rules: [{
			test: /\.pirate$/,
			loader: `require.resolve('..')?extensionName=pirate`,
			options: {
				style: {
					optional: true,
					defaultLanguage: 'css',
					tagName: 'styles',
				},
				script: {
					optional: false,
					defaultLanguage: 'javascript',
					tagName: 'script',
					acceptMethodName: 'init',
					declineMethodName: 'decline',
					disposeMethodName: 'dispose',
				},
				view: {
					optional: true,
					defaultLanguage: 'html',
					tagName: 'template',
				},
			},
		}],
	},
};

module.exports.test = (options, assert) => {
	return module.exports(options).then((response) => {
		return new Promise((resolve, reject) => {
			try {
				const $ = cheerio.load(`<!doctype html><html><head></head><body></body></html>`);
				resolve({ output: $('body').html(response.content), content: response.content });
			} catch(err) {
				reject([err]);
			}
		});
	});
};

module.exports.call = (options) => {
	const testConfig = Object(options);
	const pirateConfig = testConfig.pirateLoader;
	const internalConfig = testConfig.$internal;
	delete testConfig.pirateLoader;
	delete testConfig.$internal;
	return new Promise((resolve, reject) => {
		try {
			const warnings = [];
			const context = deepExtend({
				target: 'web',
				minimize: true,
				loaders: [],
				loaderIndex: 0,
				resource: undefined,
				sourceMap: true,
				options: {
					context: process.cwd(),
				},
			}, internalConfig, {
				resourcePath: require.resolve(testConfig.entry),
				options: {
					pirateLoader: pirateConfig,
				},
			}, testConfig);
			const content = fs.readFileSync(context.resourcePath, 'utf8');
			const output = pirateLoader.call(context, Buffer.from(content));
			resolve({ output, warnings });
		} catch (err) {
			reject([err]);
		}
	});
};
