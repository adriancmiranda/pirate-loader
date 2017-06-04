const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const webpackConfig = require('./fixtures/webpack.config');
const jsdom = require('jsdom/lib/old-api');
const pirateLoader = require('../');

const mfs = new MemoryFS();

module.exports = (options) => {
	const testConfig = Object(options);
	const pirateLoader = testConfig.pirateLoader;
	delete testConfig.pirateLoader;
	return new Promise((resolve, reject) => {
		const config = Object.assign({}, webpackConfig, testConfig);
		const loaderOptions = new webpack.LoaderOptionsPlugin({ pirateLoader });
		const plugins = (config.plugins || []).concat(loaderOptions);
		const compiler = webpack(Object.assign(pirateLoader ? { plugins } : {}, config));
		const outputFilename = path.join(config.output.path, config.output.filename);
		compiler.outputFileSystem = mfs;
		compiler.run((err, stats) => {
			if (err || stats.compilation.errors.length) {
				reject(err ? [err] : stats.compilation.errors);
			}
			resolve({
				content: mfs.readFileSync(outputFilename).toString(),
				warnings: stats.compilation.warnings,
			});
		});
	})
};

module.exports.test = (options, assert) => {
	return module.exports(options).then((response) => {
		return new Promise((resolve, reject) => {
			jsdom.env({
				src: [response.content],
				html: '<!doctype html><html><head></head><body></body></html>',
				done: (err, window) => {
					if (err) {
						reject([err[0].data.error]);
					}
					resolve(Object.assign({}, response, { window }));
				},
			});
		});
	});
};

module.exports.call = (resourcePath, loaderOptions) => {
	const config = Object.assign({}, loaderOptions);
	const context = {
		resourcePath: require.resolve(resourcePath),
		options: {
			context: process.cwd(),
			pirateLoader: config,
		},
	};
	const content = fs.readFileSync(context.resourcePath, 'utf8');
	return pirateLoader.call(context, Buffer.from(content));
};
