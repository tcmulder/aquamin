// get the default configuration
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
// initialize dependencies
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const FilenameReplaceWebpackPlugin = require('filename-replace-webpack-plugin');
const { globSync } = require('glob');
require('dotenv').config();

// exit if we don't have the right values in a .env file
if (!process.env.URL) throw new Error('No .env file with URL property found.');

// create array of individual entry points based on glob file paths
let globs = {};
[
	'./assets/block-library/**/*view.{css,scss}',
	'./assets/block-library/**/*view.{js,ts}',
	'./assets/component-library/**/*view.{css,scss}',
	'./assets/component-library/**/*view.{js,ts}',
	'./assets/**/*.bundle.js',
].forEach((entry) => {
	// for each entry we find
	const newEntry = globSync(entry).reduce((files, filepath) => {
		// get path/filename details for this entry
		const { dir, name, ext } = path.parse(filepath);
		const dirs = dir.split('/');
		const newDir = dirs.slice(1).join('/');
		let newName = `${newDir}/${name}`;

		// prevent same-name files from overriding each other (e.g. view.css and view.js)
		if (globs[newName]) {
			newName += '_AQUAMIN_PREVENT_DUP_OVERRIDE_';
		}
		// add this entry
		files[newName] = path.resolve(process.cwd(), dir, `${name}${ext}`);
		// pass files to next iteration
		return files;
	}, {});
	// add our new entry to our growing list of entrypoints
	globs = {
		...globs,
		...newEntry,
	};
});

// allow inline svg (by ignoring *.inline.svg in @wordpress/scripts's defaultConfig itself)
const loadInlineSVG = () => {
	const svgConfigIndex = defaultConfig.module.rules.findIndex((obj) => {
		return String(obj.test) === '/\\.svg$/';
	});
	if (svgConfigIndex) {
		defaultConfig.module.rules[svgConfigIndex].exclude = /\.inline\.svg$/;
	}
};
loadInlineSVG();

// modify default @wordpress/scripts config
module.exports = {
	...defaultConfig,
	// be a little less verbose (set to 'normal' for more output)
	stats: 'errors-warnings',
	...{
		entry: {
			...defaultConfig.entry(), // or ...getWebpackEntryPoints() (see https://github.com/WordPress/gutenberg/issues/58074)
			// add our entry points
			...globs,
			'config/browsersync.config': path.resolve(
				process.cwd(),
				'includes/config',
				'browsersync.config.js',
			),
		},
		plugins: [
			...defaultConfig.plugins,

			// copy all static assets to dist without processing them
			new CopyPlugin({
				patterns: [
					{
						from: './assets/static',
						to: './static',
					},
				],
			}),

			// prevent same-name files from overriding each other (e.g. view.css and view.js)
			new FilenameReplaceWebpackPlugin([
				{
					replace: (filename) => {
						const reg = /_AQUAMIN_PREVENT_DUP_OVERRIDE_/;
						return reg.test(filename) && filename.replace(reg, '');
					},
				},
			]),

			// remove empty .js files (after *.asset.php files have been generated)
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
				// allow glob patterns in JavaScript
				{
					test: /\.m?(j|t)sx?$/,
					use: ['webpack-import-glob-loader'],
				},
				// allow glob patterns in CSS
				{
					test: /\.(c|sc|sa)ss$/,
					use: ['webpack-import-glob-loader'],
				},
				// use PostCSS for .css files
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
				// load *.inline.svg files as React components
				{
					test: /\.inline\.svg$/,
					use: ['@svgr/webpack'],
				},
			],
		},
	},
};
