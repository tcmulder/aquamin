/**
 * Initialize dependencies
 */
const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const fs = require('fs');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const { globSync } = require('glob');
require('dotenv').config();

// exit if we don't have the right values in .env file
if (!process.env.URL) throw new Error('No .env file with URL property found.');

/**
 * Get default config
 *
 * Parse the default(s): it's an object unless using --experimental-modules in which case it's an array
 */
const config = {};
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
if (defaultConfig.length) {
	config.commonConfig = defaultConfig[0];
	config.moduleConfig = defaultConfig[1];
} else {
	config.commonConfig = defaultConfig;
}

/**
 * Modify default @wordpress/scripts config for CommonJS
 *
 * Customize the script to support our theme's unique
 * file organization. (Note the default config already
 * handles many block-related files.)
 */
const aquaminConfig = {
	// be a little less verbose (set to 'normal' for more output)
	stats: 'errors-warnings',
	// combine our entries with the default ones (which are mostly block related)
	entry: {
		...config.commonConfig.entry(), // or ...getWebpackEntryPoints() (see https://github.com/WordPress/gutenberg/issues/58074)
		...[
			'./assets/block-library/**/*view.{css,scss}',
			'./assets/block-editor/**/*view.{css,scss}',
			'./assets/block-editor/**/*view.{js,ts}',
			'./assets/component-library/**/*view.{css,scss}',
			'./assets/component-library/**/*view.{js,ts}',
		].reduce((acc, cur) => {
			/**
			 * Compile individual view files
			 *
			 * All files within the assets directory ending in "view.css" or
			 * "view.js" get compiled into the dist directory as separate files.
			 * You can then manually enqueue these wherever they're needed.
			 */
			const newEntry = globSync(cur).reduce((files, filepath) => {
				const { dir, name, ext } = path.parse(filepath);
				const dirs = dir.split('/');
				const newDir = dirs.slice(1).join('/');
				const newName = `${newDir}/${name}`;
				files[`${newName}${ext}`] = path.resolve(
					process.cwd(),
					dir,
					`${name}${ext}`,
				);
				return files;
			}, {});
			return { ...acc, ...newEntry };
		}, {}),
		...(() => {
			const files = globSync([
				/**
				 * Compile single theme CSS file and JS file
				 *
				 * All files within the assets directory ending
				 * in "theme.js" or "theme.css" get enqueued on
				 * the front-end of the website, site-wide via
				 * the theme.bundle.js and theme.bundle.css files.
				 */
				path.resolve(process.cwd(), 'assets/**/**theme.css'),
				path.resolve(process.cwd(), 'assets/**/**theme.js'),
				/**
				 * Stuff we don't wanna talk about...
				 *
				 * See file for notes. Added here to be
				 * near last in cascade. Loaded site-wide.
				 */
				path.resolve(process.cwd(), 'assets/global/shame.css'),
			]);
			return files.length ? { 'global/theme.bundle': files } : {};
		})(),
		...(() => {
			const files = globSync([
				/**
				 * Import select theme stylesheets to block editor
				 *
				 * This causes the editor to inherit
				 * the theme's major styling features.
				 */
				path.resolve(process.cwd(), 'assets/global/theme.css'),
				/**
				 * Compile block editor back-end styling
				 *
				 * All files within the assets directory ending
				 * in "editor.css" get enqueued on the back-end of
				 * the block editor, site-wide via the editor.bundle.css
				 * file.
				 */
				path.resolve(process.cwd(), 'assets/**/**editor.css'),
				path.resolve(process.cwd(), 'assets/block-editor/**/*index.js'),
			]);
			return files.length ? { 'global/editor.bundle': files } : {};
		})(),
		/**
		 * Sync brwosersync changes with block editor iframe
		 *
		 * See the browsersync.config.js file for more information.
		 */
		'config/browsersync.config': path.resolve(
			process.cwd(),
			'includes/config',
			'browsersync.config.js',
		),
	},
	plugins: [
		// copy all static assets to dist without processing them
		new CopyPlugin({
			patterns: [
				{
					from: './assets/static',
					to: './static',
				},
			],
		}),

		// remove empty .js files (after *.asset.php files have been generated)
		new RemoveEmptyScriptsPlugin({
			stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
		}),

		// setup browsersync
		new BrowserSyncPlugin(
			{
				proxy: process.env.URL,
				open: false,
				files: [
					'**/*.php',
					'assets/**/*.js',
					'assets/**/*.mjs',
					'dist/**/*.css',
				],
				ignore: ['dist/**/*.php', 'dist/**/*.js'],
				logFileChanges: false,
			},
			{
				injectCss: true,
				reload: false,
			},
		),

		// fix duplicate prefixes (it's necessary to add them to prevent empty JS files from overriding real JS files)
		// @see https://www.npmjs.com/package/webpack-remove-empty-scripts
		new EventHooksPlugin({
			afterEmit: () => {
				const duplicateExt = globSync('./dist/**/*{.css.css,.js.js}');
				duplicateExt.forEach((file) => {
					const ext = path.extname(file);
					const newName = file.replace(new RegExp(`${ext}$`), '');
					fs.rename(file, newName, (err) => {
						if (err) throw err;
					});
				});
			},
		}),
	],
	module: {
		rules: [
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
			// load *.inline.svg files as React components
			{
				test: /\.inline\.svg$/,
				use: ['@svgr/webpack'],
			},
		],
	},
};

// allow inline svg (by ignoring *.inline.svg in @wordpress/scripts's config.commonConfig object itself)
const loadInlineSVG = () => {
	const svgConfigIndex = config.commonConfig.module.rules.findIndex((obj) => {
		return String(obj.test) === '/\\.svg$/';
	});
	if (svgConfigIndex) {
		config.commonConfig.module.rules[svgConfigIndex].exclude =
			/\.inline\.svg$/;
	}
};
loadInlineSVG();

/**
 * Modify ESmodules @wordpress/scripts config
 *
 * Customize the script to support our theme's
 * .mjs files.
 */

let aquaminModuleConfig = null;
if (config.moduleConfig) {
	aquaminModuleConfig = {
		output: { module: true },
		experiments: { outputModule: true },
		entry: {
			...[
				'./assets/block-library/**/*view.mjs',
				'./assets/block-editor/**/*view.mjs',
				'./assets/component-library/**/*view.mjs',
			].reduce((acc, cur) => {
				/**
				 * Compile individual ESmodules view files
				 *
				 * All files within the assets directory ending in
				 * "view.mjs" get compiled as ESmodules as individual
				 * files. You can then enqueue them manually as needed.
				 */
				const newEntry = globSync(cur).reduce((files, filepath) => {
					const { dir, name, ext } = path.parse(filepath);
					const dirs = dir.split('/');
					const newDir = dirs.slice(1).join('/');
					const newName = `${newDir}/${name}`;
					files[`${newName}.js`] = path.resolve(
						process.cwd(),
						dir,
						`${name}${ext}`,
					);
					return files;
				}, {});
				return { ...acc, ...newEntry };
			}, {}),
			/**
			 * Compile theme's ESmodules
			 *
			 * All files within the assets directory ending
			 * in "theme.mjs" get enqueued on the front-end of the
			 * website, site-wide, through the theme.module.bundle.js
			 * file.
			 */
			...(() => {
				const newEntries = globSync(
					path.resolve(process.cwd(), 'assets/**/**theme.mjs'),
				);
				return newEntries.length
					? { 'global/theme.module.bundle': newEntries }
					: {};
			})(),
		},
	};
}

// return object (CommonJSConfig) or array ([CommonJSConfig, ESmodulesConfig])
// @see https://github.com/WordPress/gutenberg/blob/3a38dd82e9abff09747e1db0ae989b9d1cc67c84/packages/scripts/config/webpack.config.js#L469
let ret = null;
if (aquaminModuleConfig) {
	ret = [
		merge(config.commonConfig, aquaminConfig),
		merge(config.moduleConfig, aquaminModuleConfig),
	];
} else {
	ret = merge(config.commonConfig, aquaminConfig);
}
module.exports = ret;
