const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const webpackConfig = require('./fixtures/webpack.config');
const jsdom = require('jsdom/lib/old-api');
const deepExtend = require('deep-extend');
const pirateLoader = require('../');

const mfs = new MemoryFS();

module.exports = (options) => {
	const testConfig = Object(options);
	const pirateConfig = testConfig.pirateLoader;
	delete testConfig.pirateLoader;
	delete testConfig.$internal;
	return new Promise((resolve, reject) => {
		const config = deepExtend({}, webpackConfig, testConfig);
		const loaderOptions = new webpack.LoaderOptionsPlugin({ pirateLoader: pirateConfig  });
		const plugins = (config.plugins || []).concat(loaderOptions);
		const compiler = webpack(deepExtend(pirateConfig ? { plugins } : {}, config));
		const outputFilename = path.join(config.output.path, config.output.filename);
		compiler.outputFileSystem = mfs;
		compiler.run((err, stats) => {
			const warnings = stats.compilation.warnings;
			const errors = stats.compilation.errors;
			if (err || errors.length) {
				reject(err ? [err] : errors);
			} else {
				resolve({ output: mfs.readFileSync(outputFilename).toString(), warnings });
			}
		});
	})
};

module.exports.test = (options, assert) => {
	return module.exports(options).then((response) => {
		return new Promise((resolve, reject) => {
			jsdom.env({
				src: [response.content],
				html: '<!doctype html><html><head></head><body></body></html>',
				done(err, window) {
					if (err) {
						reject([err[0].data.error]);
					}
					resolve(deepExtend({}, response, { window }));
				},
			});
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
