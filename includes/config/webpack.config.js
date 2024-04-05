const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' );
const RemoveEmptyScriptsPlugin  = require( 'webpack-remove-empty-scripts' );
const CopyPlugin                = require( 'copy-webpack-plugin' );
const postcssPresetEnv          = require( 'postcss-preset-env' );
const path         = require( 'path' );
const { globSync } = require( 'glob' );



let globs = {};
const toGlob = [
	'./assets/block-library/**/*view.css',
	'./assets/**/*.bundle.js',
];
toGlob.forEach((entry) => {
	const newEntry = globSync( entry ).reduce(
		( files, filepath ) => {
			const { dir, name, ext } = path.parse( filepath );
			const dirs = dir.split('/');
			const newDir = dirs.slice(1).join('/')
			files[ `${newDir}/${ name }` ] = path.resolve(
				process.cwd(),
				dir,
				`${ name }${ext}`
			);
	
			return files;
		}, {}
	)
	globs = {
		...globs,
		...newEntry
	}
})
console.log('🤞', globs)

// Gets all of the block stylesheets, which are enqueued separately and inlined
// into the `<head>` area by WordPress. These should not be bundled together.
// const blockStylesheets = () => globSync( './assets/block-library/**/*.css' ).reduce(
// 	( files, filepath ) => {
// 		const name = path.parse( filepath ).name;

// 		files[ `css/blocks/core/${ name }` ] = path.resolve(
// 			process.cwd(),
// 			'resources/scss/blocks/core',
// 			`${ name }.css`
// 		);

// 		return files;
// 	}, {}
// );

// ./assets/**/*.bundle.js
// ./assets/**/*view.js
// ./assets/**/*view.scss

// ./assets/block-library/*/index.js",
// ./assets/**/*.bundle.css

// Add any a new entry point by extending the webpack config.
module.exports = {
	...defaultConfig,
	...{
		entry: {
			...defaultConfig.entry(), // or ...getWebpackEntryPoints() (see https://github.com/WordPress/gutenberg/issues/58074)
			// ...getWebpackEntryPoints(),
			...globs,
			'config/browsersync.bundle': path.resolve( process.cwd(), 'includes/config', 'browsersync.bundle.js' )
		},
		// plugins: [
		// 	// Very important! Include WP's plugin config or the
		// 	// world will cease to exist as we know it.
		// 	...defaultConfig.plugins,

		// 	// Removes the empty `.js` files generated by webpack but
		// 	// sets it after WP has generated its `*.asset.php` file.
		// 	new RemoveEmptyScriptsPlugin( {
		// 		stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS
		// 	} ),

		// 	// // Copies any assets that don't need to be processed to
		// 	// // the output folder.
		// 	// new CopyPlugin( {
		// 	// 	patterns: [
		// 	// 		{
		// 	// 			from: './resources/fonts',
		// 	// 			to:   './fonts'
		// 	// 		},
		// 	// 		{
		// 	// 			from: './resources/media',
		// 	// 			to:   './media'
		// 	// 		},
		// 	// 		{
		// 	// 			from: './resources/partials',
		// 	// 			to:   './partials'
		// 	// 		}
		// 	// 	]
		// 	// } )
		// ],
		module: {
			...defaultConfig.module,
			rules: [
				...defaultConfig.module.rules,
				{
                    test: /\.m?(j|t)sx?$/,
                    use: [
                        "webpack-import-glob-loader",
                    ]
                },
				{
					test: /\.(c|sc|sa)ss$/,
					use: [
						"webpack-import-glob-loader",
					]
				},
				{
					test: /\.css$/,
					use: [{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									['postcss-preset-env', {
										stage: 3,
										features: { 'nesting-rules': true }
									}]
								]
							}
						}
					}]
				}
			]
		}
	}
};