/**
 * Initialize dependencies
 */
const path = require('path');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const fs = require('fs');
// const FilenameReplaceWebpackPlugin = require('filename-replace-webpack-plugin');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const { globSync } = require('glob');
require('dotenv').config();

/**
 * Handle preconditions
 */
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
 * Create standard CommonJS and CSS entrypoints
 */

// create array of individual entry points based on glob file paths
const getEntryGlobs = () => {
	let entries = {};
	/**
	 * Manually loaded component files
	 *
	 * All files within the assets
	 * directory ending in "view.css" or "view.js" get
	 * compiled into the dist directory. You can then
	 * manually enqueue these wherever they're needed.
	 */
	[
		'./assets/component-library/**/*view.{css,scss}',
		'./assets/component-library/**/*view.{js,ts}',
		'./assets/block-library/**/*view.{css,scss}',
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

// create single CSS and JavaScript files for global front-end of theme
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

// create single editor CSS file for block editor back-end styling
const getEntryEditor = () => {
	const files = globSync([
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
	]);
	return files.length ? { 'global/editor.bundle': files } : {};
};

// create single tooling/configuration script file
const getEntryTools = () => {
	return {
		'config/browsersync.config': path.resolve(
			process.cwd(),
			'includes/config',
			'browsersync.config.js',
		),
	};
};

/**
 * Modify default @wordpress/scripts config
 *
 * Customize the script to support our theme's
 * unique files. (Note the default config already
 * handles block-related files.)
 */
const aquaminConfig = {
	// be a little less verbose (set to 'normal' for more output)
	stats: 'errors-warnings',
	// combine our entries with the default ones (which are mostly block related)
	entry: {
		...config.commonConfig.entry(), // or ...getWebpackEntryPoints() (see https://github.com/WordPress/gutenberg/issues/58074)
		/**
		 * Manually loaded component files
		 *
		 * All files within the assets
		 * directory ending in "view.css" or "view.js" get
		 * compiled into the dist directory. You can then
		 * manually enqueue these wherever they're needed.
		 */
		...[
			'./assets/component-library/**/*view.{css,scss}',
			'./assets/component-library/**/*view.{js,ts}',
			'./assets/block-library/**/*view.{css,scss}',
		].reduce((acc, cur) => {
			// for each entry we find
			const newEntry = globSync(cur).reduce((files, filepath) => {
				// get path/filename details for this entry
				const { dir, name, ext } = path.parse(filepath);
				const dirs = dir.split('/');
				const newDir = dirs.slice(1).join('/');
				const newName = `${newDir}/${name}`;

				// add this entry
				files[`${newName}${ext}`] = path.resolve(
					process.cwd(),
					dir,
					`${name}${ext}`,
				);
				// pass files to next iteration
				return files;
			}, {});
			// add our new entry to our growing list of entrypoints
			return { ...acc, ...newEntry };
		}, {}),
		...getEntryTheme(),
		...getEntryEditor(),
		...getEntryTools(),
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
				files: ['**/*.php', 'assets/**/*.js', 'dist/**/*.css'],
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
 * .mjs files. (Note the default config already
 * handles blocks using .mjs files.)
 */

let aquaminModuleConfig = null;
if (config.moduleConfig) {
	aquaminModuleConfig = {
		output: { module: true },
		experiments: { outputModule: true },
		entry: {
			/**
			 * Manual ESmodules loading
			 *
			 * All files within the assets directory ending in
			 * "view.mjs" get compiled as ESmodules in individual
			 * files you can then enqueue manually as needed.
			 */
			...[
				'./assets/block-library/**/*view.mjs',
				'./assets/component-library/**/*view.mjs',
			].reduce((acc, cur) => {
				// for each entry we find
				const newEntry = globSync(cur).reduce((files, filepath) => {
					// get path/filename details for this entry
					const { dir, name, ext } = path.parse(filepath);
					const dirs = dir.split('/');
					const newDir = dirs.slice(1).join('/');
					let newName = `${newDir}/${name}`;

					// prevent same-name files from overriding each other (e.g. view.css and view.js)
					if (acc[newName]) {
						newName += '_AQUAMIN_PREVENT_DUP_OVERRIDE_';
					}
					// add this entry
					files[`${newName}.js`] = path.resolve(
						process.cwd(),
						dir,
						`${name}${ext}`,
					);
					// pass files to next iteration
					return files;
				}, {});
				// add our new entry to our growing list of entrypoints
				return { ...acc, ...newEntry };
			}, {}),
			/**
			 * Theme's site-wide ESmodules loading
			 *
			 * All files within the assets directory ending
			 * in "theme.mjs" get enqueued on the front-end of the
			 * website, site-wide.
			 */
			...(() => {
				const newEntries = globSync(
					path.resolve(process.cwd(), 'assets/**/**theme.mjs'),
				);
				return newEntries.length
					? { 'global/theme.modules.bundle': newEntries }
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
