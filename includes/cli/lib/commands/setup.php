<?php
/**
 * Perform initial setup of aquamin theme.
 * 
 * @package AquaminCLI
 */

namespace AquaminCLI\Setup;
use WP_CLI;
use AquaminCLI\Util;

/**
* Sets up default content
*
* @param array $modules
* @param array $assoc_args
* @return null
*/
function setup( $args, $assoc_args ) {

	// we don't have errors yet
	$has_error = false;

	// install pattern library if not already done
	WP_CLI::runcommand( 'plugin is-installed all-the-things || wp plugin install --activate https://github.com/tcmulder/all-the-things/archive/refs/heads/master.zip' );
	
	// get demo content files
	$template_path = get_template_directory();
	$demo_content_path = $template_path . '/includes/cli/demo-content/';
	$demo_content = glob( $demo_content_path . '*' );
	if ( $demo_content ) {
		Util\debug( 'Demo content in', $demo_content_path );
		// determine if the importer is installed and install it if not
		$import_plugin_path = WP_CLI::runcommand( 'plugin path wordpress-importer', array( 'return' => true, 'exit_error' => false ) );
		if ( ! $import_plugin_path ) WP_CLI::runcommand( 'plugin install wordpress-importer --activate' );
		// import all the content
		foreach( $demo_content as $content ) {
			WP_CLI::runcommand( "import --quiet --authors=skip '$content'" );
		}
		// delete importer if it wasn't previously installed
		if ( ! $import_plugin_path ) WP_CLI::runcommand( 'plugin uninstall wordpress-importer --deactivate' );;
	} else {
		// say we didn't import demo content if we don't have any
		$has_error = true;
		WP_CLI::error( 'Could not find demo content to import in ' . $demo_content_path );
	}

	// report
	if ( ! $has_error ) {
		WP_CLI::success( 'Setup complete' );
		WP_CLI::line( WP_CLI::colorize( "\n%6%k What's next? %n\n" ) );
		WP_CLI::line( WP_CLI::colorize( "%C ‣ Customize your footer:%n \n" . get_admin_url( null, '/edit.php?post_type=aquamin-general' ) ) );
		WP_CLI::line( WP_CLI::colorize( "%C ‣ Visit the pattern library:%n \n" . get_admin_url( null, '/edit.php?post_type=all-the-things' ) ) );
		WP_CLI::line( "\n" );
	}

}
