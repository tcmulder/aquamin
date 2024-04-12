<?php
/**
 * Work with components in aquamin.
 * 
 * @package AquaminCLI
 */

namespace AquaminCLI\Component;
use WP_CLI;
use AquaminCLI\Util;

defined( 'ABSPATH' ) || exit; // exit if accessed directly

/**
 * Creates a component
 * 
 * ## OPTIONS
 * 
 * Note: leave these blank to enter interactive mode where you'll be asked to enter each value.
 *
 * [--component_title] 
 * : Set title.
 * 
 * [--component_slug] 
 * : Set slug.
 * 
 * [--component_dir] 
 * : Set directory name.
 * 
 * [--has_template_part] 
 * : Add a PHP template part (set to "n" to prevent)
 * 
 * [--has_view_js]
 * : Add manually enqueued front-end JavaScript (set to "n" to prevent)
 * 
 * [--has_theme_js]
 * : Add global front-end JavaScript (set to "n" to prevent)
 * 
 * [--has_view_css]
 * : Add manually enqueued front-end CSS (set to "n" to prevent)
 * 
 * [--has_theme_css]
 * : Add global front-end CSS (set to "n" to prevent)
 * 
 * [--has_block_editor_css] 
 * : Add CSS for editor (set to "n" to prevent)
 * 
 * [--has_hooks]
 * : Add functions.php-like actions and filters (set to "n" to prevent)
 *
 * ## EXAMPLES
 *
 * wp aquamin component create
 *
 * @param array $modules 
 * @param array $assoc_args 
 * @return null
 */
function component_create( $args, $assoc_args ) {
	
	/**
	 * Exit if we can't edit the filesystem
	 */
	if ( ! WP_Filesystem() ) {
		WP_CLI::error( 'Unable to access filesystem' );
		exit;
	}
	
	/**
	 * Request component details
	 */
	$far = array(); // array os strings to find and replace
	$exclude = array(); // files to exclude from scaffold

	$title = Util\build_far( $far, array(
		'question'   => 'Title [guess]:',
		'guess'      => 'My Component',
		'find'       => 'template-title',
		'default'    => $assoc_args[ 'component_title' ] ?? '',
	) );
	$slug = Util\build_far( $far, array(
		'question'   => 'Slug [guess]:',
		'guess'      => sanitize_title( $title ),
		'find'       => 'template-slug',
		'default'    => $assoc_args[ 'component_slug' ] ?? '',
	) );
	$dir = Util\build_far( $far, array(
		'question'   => 'Directory [guess]:',
		'guess'      => $slug,
		'find'       => '_template-component',
		'default'    => $assoc_args[ 'component_dir' ] ?? '',
	) );
	$has_template_part = Util\exclude( $exclude, array(
		'question'   => 'Has PHP template part view? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-view.php',
		'default'    => $assoc_args[ 'has_template_part' ] ?? '',
	) );
	$has_view_js = Util\exclude( $exclude, array(
		'question'   => 'Has manually enqueued front-end JavaScript? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-view.js',
		'default'    => $assoc_args[ 'has_view_js' ] ?? '',
	) );
	Util\exclude( $exclude, array(
		'question'   => 'Has global front-end JavaScript? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-theme.js',
		'default'    => $assoc_args[ 'has_theme_js' ] ?? '',
	) );
	$has_view_css = Util\exclude( $exclude, array(
		'question'   => 'Has manually enqueued front-end CSS? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-view.css',
		'default'    => $assoc_args[ 'has_view_css' ] ?? '',
	) );
	Util\exclude( $exclude, array(
		'question'   => 'Has global front-end CSS? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-theme.css',
		'default'    => $assoc_args[ 'has_theme_css' ] ?? '',
	) );
	Util\exclude( $exclude, array(
		'question'   => 'Has block editor CSS? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-editor.css',
		'default'    => $assoc_args[ 'has_block_editor_css' ] ?? '',
	) );
	if ( ! $has_view_js && ! $has_view_css ) { // must exist to enqueue view js or css
		Util\exclude( $exclude, array(
			'question'   => 'Has functions.php-like actions and filters? [y/N]',
			'guess'      => 'n',
			'filename'   => 'template-slug-hooks.php',
			'default'    => $assoc_args[ 'has_hooks' ] ?? '',
		) );
	}

	/**
	 * Identify paths/dirs (note all paths end with a trailing /)
	 */
	$template_path = get_template_directory();
	$library_path = $template_path . '/assets/component-library/';
	$cli_path = $template_path . '/includes/cli/templates/';
	$template_dir = 'component';
	$component_path = $library_path . $dir . '/';
	
	/**
	 * Create directory
	 */
	global $wp_filesystem;
	$wp_filesystem->mkdir( $component_path );

	// duplicate template's files (minus any we should exclude)
	copy_dir( $cli_path . $template_dir, $component_path, $exclude );


	/**
	 * Find and replace strings
	 */

	// add script/style registration and/or enqueues (unshift to top of array so template strings get replaced)
	array_unshift( $far, array(
		'find' => "\n/* TEMPLATE: register component script */",
		'repl' => ! $has_view_css ? "" : "\n\t\$asset = include AQUAMIN_DIST . '/component-library/_template-component/template-slug-view.asset.php';\n\twp_register_style(\n\t\t'aquamin-component-template-slug-style',\n\t\tget_template_directory_uri() . '/dist/component-library/_template-component/template-slug-view.css',\n\t\t\$asset['dependencies'],\n\t\t\$asset['version'],\n\t\t'screen'\n\t);"
	) );
	array_unshift( $far, array(
		'find' => "\n/* TEMPLATE: enqueue component script */",
		'repl' => ! $has_view_css ? "" : "\nwp_enqueue_style( 'aquamin-component-template-slug-style' );"
	) );
	array_unshift( $far, array(
		'find' => "\n/* TEMPLATE: register component style */",
		'repl' => ! $has_view_js ? "" : "\n\t\$asset = include AQUAMIN_DIST . '/component-library/_template-component/template-slug-view.asset.php';\n\twp_register_script(\n\t\t'aquamin-component-template-slug-script',\n\t\tget_template_directory_uri() . '/dist/component-library/_template-component/template-slug-view.js',\n\t\t\$asset['dependencies'],\n\t\t\$asset['version'],\n\t\ttrue\n\t);"
	) );
	array_unshift( $far, array(
		'find' => "\n/* TEMPLATE: enqueue component style */",
		'repl' => ! $has_view_js ? "" : "\nwp_enqueue_script( 'aquamin-component-template-slug-script' );"
	) );
	$function_name = 'aquamin_component_' . ( preg_replace( '/-/', '_', sanitize_title( $slug ) ) ) . '_register_scripts';
	array_unshift( $far, array(
		'find' => "\n/* TEMPLATE: register component scripts */",
		'repl' => ! $has_view_css && ! $has_view_js ? "" : "\n\n/**\n * Register component styles and/or scripts\n */\nadd_action( 'wp_enqueue_scripts', '$function_name' );\nfunction $function_name() {\n/* TEMPLATE: register component style */\n/* TEMPLATE: register component script */\n}"
	) );

	// replace strings
	Util\far( $component_path, $far );

	// loop through the component's directory and replace file prefixes
	Util\prefix( $component_path, 'template-slug', $slug );

	// report
	WP_CLI::success( 'Component created' );
	WP_CLI::line( WP_CLI::colorize( "\n%6%k What's next? %n\n" ) );
	WP_CLI::line( WP_CLI::colorize( "%C ‣ Restart Parcel and refresh your browser to watch these new files") );
	if ( $has_template_part ) {
		WP_CLI::line( WP_CLI::colorize( "%C ‣ Include your template part somewhere:%n get_template_part( 'dist/component-library/$dir/$slug-view' );") );
	}
	WP_CLI::line( WP_CLI::colorize( "%C ‣ Edit your new $title component:%n $component_path") );
	WP_CLI::line( "\n" );

}
