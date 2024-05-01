/**
 * Initialize dependencies
 */
const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const FilenameReplaceWebpackPlugin = require('filename-replace-webpack-plugin');
const { globSync } = require('glob');
require('dotenv').config();

/**
 * Get default config
 *
 * Parse the default(s): it's an object unless using --experimental-modules in which case it's an array
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
if (defaultConfig.length) {
	defaultConfig.commonConfig = defaultConfig[0];
	defaultConfig.moduleConfig = defaultConfig[1];
	// eslint-disable-next-line no-console
	console.log('Assuming format is [CommonJS,ESmodules] configs');
} else {
	defaultConfig.commonConfig = defaultConfig;
}

// exit if we don't have the right values in a .env file
if (!process.env.URL) throw new Error('No .env file with URL property found.');

// create array of individual entry points based on glob file paths
const getEntryGlobs = () => {
	let entries = {};
	[
		'./assets/component-library/**/*view.{css,scss}',
		'./assets/component-library/**/*view.{js,ts}',
	].forEach((entry) => {
		// for each entry we find
		const newEntry = globSync(entry).reduce((files, filepath) => {
			// get path/filename details for this entry
			const { dir, name, ext } = path.parse(filepath);
			const dirs = dir.split('/');
			const newDir = dirs.slice(1).join('/');
			let newName = `${newDir}/${name}`;

			// prevent same-name files from overriding each other (e.g. view.css and view.js)
			if (entries[newName]) {
				newName += '_AQUAMIN_PREVENT_DUP_OVERRIDE_';
			}
			// add this entry
			files[newName] = path.resolve(process.cwd(), dir, `${name}${ext}`);
			// pass files to next iteration
			return files;
		}, {});
		// add our new entry to our growing list of entrypoints
		entries = {
			...entries,
			...newEntry,
		};
	});
	return entries;
};

// create single CSS and JavaScript files for use in theme globally
const getEntryTheme = () => {
	const files = globSync([
		/**
		 * Theme-wide scripts and styles
		 *
		 * All files within the assets directory ending
		 * in "theme.js" or "theme.css" get enqueued on
		 * the front-end of the website, site-wide.
		 * All *.bundle.js files like this get bundled into
		 * a single .css and .js file in the dist/ directory.
		 */
		path.resolve(process.cwd(), 'assets/**/**theme.css'),
		path.resolve(process.cwd(), 'assets/**/**theme.js'),
		/**
		 * Stuff we don't wanna talk about...
		 *
		 * See file for notes. Added here to be last
		 * in cascade. Loaded site-wide.
		 */
		path.resolve(process.cwd(), 'assets/global/shame.css'),
	]);
	return files.length ? { 'global/theme.bundle': files } : {};
};

// // create single JavaScript file for use of ESmodules in theme globally
// getEntryThemeESModules = () => {
// 	const files = globSync([
// 		/**
// 		 * Theme-wide ESmodules scripts
// 		 *
// 		 * All files within the assets directory ending
// 		 * in "theme.mjs" get enqueued on the front-end of
// 		 * the website, site-wide, as ESmodules.
// 		 */
// 		path.resolve(process.cwd(), 'assets/**/**theme.mjs'),
// 	]);
// 	return files.length ? { 'global/theme.module.bundle': files } : {};
// };

// allow inline svg (by ignoring *.inline.svg in @wordpress/scripts's defaultConfig itself)
const loadInlineSVG = () => {
	const svgConfigIndex = defaultConfig.commonConfig.module.rules.findIndex(
		(obj) => {
			return String(obj.test) === '/\\.svg$/';
		},
	);
	if (svgConfigIndex) {
		defaultConfig.commonConfig.module.rules[svgConfigIndex].exclude =
			/\.inline\.svg$/;
	}
};
loadInlineSVG();

// modify default @wordpress/scripts config
const aquaminConfig = {
	// ...defaultConfig,
	// be a little less verbose (set to 'normal' for more output)
	stats: 'errors-warnings',
	// ...{
	entry: {
		...defaultConfig.commonConfig.entry(), // or ...getWebpackEntryPoints() (see https://github.com/WordPress/gutenberg/issues/58074)
		// add our entry points
		...getEntryGlobs(),
		'config/browsersync.config': path.resolve(
			process.cwd(),
			'includes/config',
			'browsersync.config.js',
		),
		...getEntryTheme(),
		'global/editor.bundle': globSync([
			/**
			 * Import select theme stylesheets
			 *
			 * This causes the editor to inherit
			 * the theme's major styling features,
			 * wrapped within .editor-styles-wrapper.
			 */
			path.resolve(process.cwd(), 'assets/**/**theme.css'),
			/**
			 * Block editor back-end styling
			 *
			 * All files within the assets directory ending
			 * in "editor.css" get enqueued on the back-end of
			 * the block editor, site-wide. All *.bundle.js files
			 * like this get bundled into a single .css and .js
			 * file in the dist/ directory.
			 */
			path.resolve(process.cwd(), 'assets/**/**editor.css'),
		]),
	},
	plugins: [
		// ...defaultConfig.plugins,

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
		// ...defaultConfig.module,
		rules: [
			// ...defaultConfig.module.rules,
			// allow glob patterns in JavaScript
			{
				test: /\.m?(j|t)sx?$/,
				/////////////////////////////
				use: ['webpack-import-glob-loader'], ///////////////////////////////  this causes it to fail
				//////////////////////////
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
	// },
};

let moduleGlobs = {};
[
	'./assets/block-library/**/*view.mjs',
	'./assets/component-library/**/*view.mjs',
	'./assets/**/*.bundle.mjs',
].forEach((entry) => {
	// for each entry we find
	const newEntry = globSync(entry).reduce((files, filepath) => {
		// get path/filename details for this entry
		const { dir, name, ext } = path.parse(filepath);
		const dirs = dir.split('/');
		const newDir = dirs.slice(1).join('/');
		let newName = `${newDir}/${name}`;

		// prevent same-name files from overriding each other (e.g. view.css and view.js)
		if (moduleGlobs[newName]) {
			newName += '_AQUAMIN_PREVENT_DUP_OVERRIDE_';
		}
		// add this entry
		files[newName] = path.resolve(process.cwd(), dir, `${name}${ext}`);
		// pass files to next iteration
		return files;
	}, {});
	// add our new entry to our growing list of entrypoints
	moduleGlobs = {
		...moduleGlobs,
		...newEntry,
	};
});

const aquaminModuleConfig = {
	...defaultConfig.moduleConfig,
	output: { ...defaultConfig.moduleConfig.output, module: true },
	experiments: { outputModule: true },
	entry: {
		// ...defaultConfig.moduleConfig.entry(),
		...moduleGlobs,
	},
	// resolve: {
	// 	...defaultConfig.moduleConfig.resolve,
	// 	alias: {
	// 		...defaultConfig.moduleConfig.resolve.alias,
	// 		...getWebPackAlias(),
	// 	},
	// },
	// plugins: [
	// 	...defaultConfig.moduleConfig.plugins,
	// 	// ...defaultConfig.moduleConfig.plugins.filter(
	// 	// 	(plugin) =>
	// 	// 		plugin.constructor.name !== 'DependencyExtractionWebpackPlugin',
	// 	// ),
	// 	// new DependencyExtractionWebpackPlugin({
	// 	// 	requestToExternal,
	// 	// 	requestToHandle,
	// 	// 	requestToExternalModule,
	// 	// }),
	// 	// Removes the empty `.js` files generated by webpack but
	// 	// sets it after WP has generated its `*.asset.php` file.
	// 	new RemoveEmptyScriptsPlugin({
	// 		stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
	// 	}),
	// ],
	module: {
		// ...defaultConfig.module,
		rules: [
			// ...defaultConfig.module.rules,
			// allow glob patterns in JavaScript
			{
				test: /\.m?(j|t)sx?$/,
				/////////////////////////////
				use: ['webpack-import-glob-loader'], ///////////////////////////////  this causes it to fail
				//////////////////////////
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
};

// return object (CommonJSConfig) or array ([CommonJSConfig, ESmodulesConfig])
// @see https://github.com/WordPress/gutenberg/blob/3a38dd82e9abff09747e1db0ae989b9d1cc67c84/packages/scripts/config/webpack.config.js#L469
let config = null;
if (defaultConfig.length) {
	config = [
		merge(defaultConfig.commonConfig, aquaminConfig),
		merge(defaultConfig.moduleConfig, aquaminModuleConfig),
	];
} else {
	config = merge(defaultConfig.commonConfig, aquaminConfig);
}
module.exports = config;
