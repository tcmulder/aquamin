const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { globSync } = require('glob');
const FilenameReplaceWebpackPlugin = require('filename-replace-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
require('dotenv').config();

if (!process.env.URL) throw new Error('No .env file with URL property found.');

let globs = {};
const toGlob = [
	'./assets/block-library/**/*view.css',
	'./assets/block-library/**/*view.js',
	'./assets/component-library/**/*view.css',
	'./assets/component-library/**/*view.js',
	'./assets/**/*.bundle.js',
];
toGlob.forEach((entry) => {
	const newEntry = globSync(entry).reduce((files, filepath) => {
		const { dir, name, ext } = path.parse(filepath);
		const dirs = dir.split('/');
		const newDir = dirs.slice(1).join('/');
		let newName = `${newDir}/${name}`;

		// prevent duplicate filenames (e.g. view.css and view.js override each other)
		if (globs[newName]) {
			newName += '_AQUAMIN_PREVENT_DUP_OVERRIDE_';
		}

		files[newName] = path.resolve(process.cwd(), dir, `${name}${ext}`);

		return files;
	}, {});
	globs = {
		...globs,
		...newEntry,
	};
});

// @wordpress/scripts loads all SVGs as data URIs so we exclude *.inline.svg ourselves
const loadInlineSVG = () => {
	const svgConfigIndex = defaultConfig.module.rules.findIndex((obj) => {
		return String(obj.test) === '/\\.svg$/';
	});
	if (svgConfigIndex) {
		defaultConfig.module.rules[svgConfigIndex].exclude = /\.inline\.svg$/;
	}
};
loadInlineSVG();

// Add any a new entry point by extending the webpack config.
module.exports = {
	...defaultConfig,
	stats: 'errors-warnings',
	...{
		entry: {
			...defaultConfig.entry(), // or ...getWebpackEntryPoints() (see https://github.com/WordPress/gutenberg/issues/58074)
			...globs,
			'config/browsersync.bundle': path.resolve(
				process.cwd(),
				'includes/config',
				'browsersync.bundle.js',
			),
		},
		plugins: [
			// Very important! Include WP's plugin config or the
			// world will cease to exist as we know it.
			...defaultConfig.plugins,

			// Copies any assets that don't need to be processed to
			// the output folder.
			new CopyPlugin({
				patterns: [
					{
						from: './assets/static',
						to: './static',
					},
				],
			}),

			// prevent duplicate filenames (e.g. view.css and view.js override each other)
			new FilenameReplaceWebpackPlugin([
				{
					replace: (filename) => {
						const reg = /_AQUAMIN_PREVENT_DUP_OVERRIDE_/;
						return reg.test(filename) && filename.replace(reg, '');
					},
				},
			]),

			// Removes the empty `.js` files generated by webpack but
			// sets it after WP has generated its `*.asset.php` file.
			new RemoveEmptyScriptsPlugin({
				stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
			}),

			// setup browsersync
			new BrowserSyncPlugin(
				{
					proxy: process.env.URL,
					open: false,
					files: ['**/*.php', 'assets/**/*.js', 'dist/**/*.css'],
					ignore: ['dist/**/*.php', 'dist/**/*.js'],
					logFileChanges: false,
				},
				{
					injectCss: true,
					reload: false,
				},
			),
		],
		module: {
			...defaultConfig.module,
			rules: [
				...defaultConfig.module.rules,
				{
					test: /\.m?(j|t)sx?$/,
					use: ['webpack-import-glob-loader'],
				},
				{
					test: /\.(c|sc|sa)ss$/,
					use: ['webpack-import-glob-loader'],
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										[
											'postcss-preset-env',
											{
												stage: 3,
												features: {
													'nesting-rules': true,
												},
											},
										],
									],
								},
							},
						},
					],
				},
				{
					test: /\.inline\.svg$/,
					use: ['@svgr/webpack'],
				},
			],
		},
	},
};
