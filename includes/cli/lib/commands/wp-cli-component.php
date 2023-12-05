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
 * [--has_js] 
 * : Add front-end JavaScript file (set to "n" to prevent)
 * 
 * [--has_template_part] 
 * : Add a PHP template part (set to "n" to prevent)
 * 
 * [--has_admin_css] 
 * : Add CSS for editor (set to "n" to prevent)
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
	Util\exclude( $exclude, array(
		'question'   => 'Has front-end JavaScript? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-script.js',
		'default'    => $assoc_args[ 'has_js' ] ?? '',
	) );
	$has_template_part = Util\exclude( $exclude, array(
		'question'   => 'Has PHP template part? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-markup.php',
		'default'    => $assoc_args[ 'has_template_part' ] ?? '',
	) );
	Util\exclude( $exclude, array(
		'question'   => 'Has admin CSS? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-editor.css',
		'default'    => $assoc_args[ 'has_admin_css' ] ?? '',
	) );

	/**
	 * Identify paths/dirs (note all paths end with a trailing /)
	 */
	$template_path = get_template_directory();
	$library_path = $template_path . '/assets/component-library/';
	$cli_path = $template_path . '/includes/cli/templates/';
	$template_dir = 'component';
	$component_path = $library_path . $dir . '/';
	
	/**
	 * Create plugin directory
	 */
	global $wp_filesystem;
	$wp_filesystem->mkdir( $component_path );

	// duplicate template's files (minus any we should exclude)
	copy_dir( $cli_path . $template_dir, $component_path, $exclude );

	/**
	 * Find and replace strings
	 */
	Util\far( $component_path, $far );

	// loop through the component's directory and replace file prefixes
	Util\prefix( $component_path, 'template-slug', $slug );

	// report
	WP_CLI::success( 'Component created' );
	WP_CLI::line( WP_CLI::colorize( "\n%6%k What's next? %n\n" ) );
	WP_CLI::line( WP_CLI::colorize( "%C ‣ Restart Parcel and refresh your browser to watch these new files") );
	if ( $has_template_part ) {
		WP_CLI::line( WP_CLI::colorize( "%C ‣ Include your template part somewhere:%n get_template_part( 'assets/component-library/$dir/$slug-markup' );") );
	}
	WP_CLI::line( WP_CLI::colorize( "%C ‣ Edit your new $title component:%n $component_path") );
	WP_CLI::line( "\n" );

}
