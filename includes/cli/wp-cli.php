<?php
/*
Plugin Name: Aquamin WP-CLI Helpers
Plugin URI: https://www.thinkaquamarine.com
Description: WP-CLI helpers for working with the aquamin theme.
Author: @tcmulder
Version: 1.0.0
Author URI: https://www.thinkaquamarine.com
*/

/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class AQUAMIN_CLI {

	/**
     * We are asking a question and returning an answer as a string.
     *
     * @param {string} $question Question to ask the user.
     * @param {string} $guess Optional guess at the user's answer.
     * @return string
     */
    protected function ask( $question, $guess='' ) {
        fwrite( STDOUT, $question . ' ' );
		$answer = trim( fgets( STDIN ) );
		$answer = $answer ? $answer : $guess;
        return $answer;
    }

	/**
	 * Creates a block
	 * 
     * ## OPTIONS
	 * 
	 * Note: leave these blank to enter interactive mode where you'll be asked to enter each value.
     *
	 * [--block_title] 
	 * : Set title.
	 * 
	 * [--block_slug] 
	 * : Set slug.
	 * 
	 * [--block_dir] 
	 * : Set directory.
	 * 
	 * [--block_namespace] 
	 * : Set namespace.
	 * 
	 * [--block_desc] 
	 * : Set description.
	 * 
	 * [--inner_block_title] 
	 * : Set inner block title.
	 * 
	 * [--inner_block_slug] 
	 * : Set inner block slug.
	 * 
	 * [--inner_block_namespace] 
	 * : Set inner block namespace.
	 * 
	 * [--inner_block_desc] 
	 * : Set inner block description.
     *
     * ## EXAMPLES
     *
     * wp aquamin block
	 *
	 * @param array $modules 
     * @param array $assoc_args 
	 */
	public function block( $args, $assoc_args ) {
		
		/**
		 * Exit if we can't edit the filesystem
		 */
		if ( ! WP_Filesystem() ) {
			WP_CLI::error( 'Unable to access filesystem' );
			exit;
		}
		
		/**
		 * Request block details
		 */
		$block = array();
		
		$title = 'My Block';
		$guess = $title;
		$block[ 'block_title' ] = array(
			$assoc_args[ 'block_title' ] ?? $this->ask( "Title [$guess]:", $guess ),
			'template-title',
		);
		$title = $block[ 'block_title' ][ 0 ];
		
		$guess = sanitize_title( $title );
		$block[ 'block_slug' ] = array(
			$assoc_args[ 'block_slug' ] ?? $this->ask( "Slug [$guess]:", $guess ),
			'template-slug',
		);
		$slug = $block[ 'block_slug' ][ 0 ];
		
		$guess = $slug;
		$block[ 'block_dir' ] = array(
			$assoc_args[ 'block_dir' ] ?? $this->ask( "Directory [$guess]:", $guess ),
			'_template-block',
		);
		
		$guess = str_replace(' ', '', $title);
		$block[ 'block_namespace' ] = array(
			$assoc_args[ 'block_namespace' ] ?? $this->ask( "Namespace [$guess]:", $guess ),
			'TemplateNamespace',
		);

		$guess = 'The ' . $title . ' block.';
		$block[ 'block_desc' ] = array(
			$assoc_args[ 'block_desc' ] ?? $this->ask( "Description [$guess]:", $guess ),
			'template-desc',
		);

		$ask_js = $this->ask('Has front-end JavaScript? [y/N]');
		$has_js = strtolower( $ask_js ?? '' ) === 'y' ? true : false;

		$ask_dynamic = $this->ask('Dynamic? [y/N]');
		$is_dynamic = strtolower( $ask_dynamic ?? '' ) === 'y' ? true : false;

		$has_inner_block = false;
		$inner_slug = '';
		if ( ! $is_dynamic ) {

			$ask_inner_block = $this->ask('Add inner block? [y/N]');
			$has_inner_block = strtolower( $ask_inner_block ?? '' ) === 'y' ? true : false;
			$inner_block = array();
			if ( $has_inner_block ) {
	
				// ask what to call the inner block
				$guess = $title . ' Item';
				$inner_block[ 'inner_block_title' ] = array(
					$assoc_args[ 'inner_block_title' ] ?? $this->ask("Inner block title [$guess]:", $guess),
					'template-item-title',
				);
				$title = $inner_block[ 'inner_block_title' ][ 0 ];
				
				$guess = sanitize_title( $title );
				$inner_block[ 'inner_block_slug' ] = array(
					$assoc_args[ 'inner_block_slug' ] ?? $this->ask("Inner block slug [$guess]:", $guess),
					'template-item-slug',
				);
				$inner_slug = $inner_block[ 'inner_block_slug' ][ 0 ];
				
				$guess = str_replace(' ', '', $title);
				$inner_block[ 'inner_block_namespace' ] = array(
					$assoc_args[ 'inner_block_namespace' ] ?? $this->ask("Inner block namespace [$guess]:", $guess),
					'TemplateItemNamespace',
				);
	
				$guess = 'The ' . $title . ' block.';
				$inner_block[ 'inner_block_desc' ] = array(
					$assoc_args[ 'inner_block_desc' ] ?? $this->ask("Inner block description [$guess]:", $guess),
					'template-item-desc',
				);

				$inner_block[ 'parent_block_slug' ] = array(
					$block[ 'block_slug' ][0],
					'template-slug',
				);

			}

		}

		/**
		 * Identify paths/dirs
		 * 
		 * Note: all paths end with a trailing /
		 */
		$template_path = get_template_directory();
		$library_path = $template_path . '/blocks/block-library/';
		$cli_path = $template_path . '/includes/cli/templates/';
		$template_dir = '';
		if ( $is_dynamic ) {
			$template_dir = 'block-dynamic';
		} else {
			$template_dir = 'block';
		}
		$block_path = $library_path . $slug . '/';
		
		/**
		 * Create plugin directory
		 */
		global $wp_filesystem;
		$wp_filesystem->mkdir( $block_path );

		// duplicate template's files
		copy_dir( $cli_path . $template_dir, $block_path );

		// if we have front-end scripts
		if ( $has_js ) {
			copy( $cli_path . '/common/template-slug-script.js', $block_path . 'template-slug-script.js' );
		}

		/**
		 * Find and replace strings
		 */
		$block_files = new RecursiveDirectoryIterator( $block_path );
		// loop through new block's directory
		foreach( new RecursiveIteratorIterator( $block_files ) as $file ) {
			// perform find and replace
			if ( is_file( $file ) ) {
				$str = file_get_contents( $file );
				foreach ( $block as $key => $value ) {
					$str = str_replace( $value[ 1 ], $value[ 0 ], $str);
				}
				file_put_contents( $file, $str );
			}
		}
		
		/**
		 * Setup inner blocks
		 */
		if ( $has_inner_block ) {

			// register/setup the inner block within parent files
			$inner_block_removes = array(
				array(
					'path' => $block_path . 'index.js',
					'replace' =><<< EOD
					/**
					 * Import dependencies
					 */
					EOD,
					'with' =><<< EOD
					/**
					 * Register inner blocks
					 */
					import './template-item-slug';

					/**
					 * Import dependencies
					 */
					EOD
				),
				array(
					'path' => $block_path . 'index.php',
					'replace' =><<< EOD
					// register the block
					register_block_type_from_metadata( dirname( __FILE__ ) );
					EOD,
					'with' =><<< EOD
					// register the block
					register_block_type_from_metadata( dirname( __FILE__ ) );

					// register inner blocks
					register_block_type_from_metadata( dirname( __FILE__ ) . '/template-item-slug' );
					EOD
				),
				array(
					'path' => $block_path . 'edit.js',
					'replace' => '<InnerBlocks />',
					'with' =><<< EOD
					<InnerBlocks
									template={[['aquamin/template-item-slug']]}
									allowedBlocks={['aquamin/template-item-slug']}
								/>
					EOD
				),
			);
			foreach( $inner_block_removes as $remove ) {
				$file = $remove[ 'path' ];
				$str = file_get_contents( $file );
				$str = str_replace( $remove[ 'replace'], $remove[ 'with'], $str );
				file_put_contents( $file, $str );	
			}

			// copy the inner blocks directory
			$template_inner_dir = 'block-inner';
			$block_inner_path = $block_path . $inner_slug . '/';
			$wp_filesystem->mkdir( $block_inner_path );
			copy_dir( $cli_path . $template_inner_dir, $block_inner_path );
			
			// loop through block's directory (including parent block) to find/replace text
			foreach( new RecursiveIteratorIterator( $block_files ) as $file ) {
				if ( is_file( $file ) ) {
					$str = file_get_contents( $file );
					foreach ( $inner_block as $key => $value ) {
						$str = str_replace( $value[ 1 ], $value[ 0 ], $str);

					}
					file_put_contents( $file, $str );
				}
			}			

		}

		// loop through the block's directory and replace temporary prefix names
		foreach( new RecursiveIteratorIterator( $block_files ) as $file ) {
			if ( is_file( $file ) ) {
				$file_name = basename( $file );
				if ( 'template-slug' === substr( $file_name, 0, 13 ) ) {
					$new_file = str_replace( 'template-slug', $slug, $file );
					rename( $file, $new_file );
				} elseif ( 'template-item-slug' === substr( $file_name, 0, 18 ) ) {
					$new_file = str_replace( 'template-item-slug', $inner_slug, $file );
					rename( $file, $new_file );
				}
			}
		}

		// report
		WP_CLI::success( 'Block created' );
	}

	/**
	 * Sets up default content
	 *
	 * @param array $modules 
     * @param array $assoc_args 
	 */
	public function setup( $args, $assoc_args ) {

		// we don't have errors yet
		$has_error = false;

		// install pattern library if not already done
		WP_CLI::runcommand( 'plugin is-installed all-the-things || wp plugin install --activate https://github.com/tcmulder/all-the-things/archive/refs/heads/master.zip' );
		
		// get demo content files
		$template_path = get_template_directory();
		$demo_content_path = $template_path . '/includes/cli/demo-content/';
		$demo_content = glob($demo_content_path . '*');
		if ( $demo_content ) {
			// determine if the importer is installed and install it if not
			$import_plugin_path = WP_CLI::runcommand( 'plugin path wordpress-importer', array( 'return' => true, 'exit_error' => false ) );
			if ( ! $import_plugin_path ) WP_CLI::runcommand( 'plugin install wordpress-importer --activate' );
			// import all the content
			foreach( $demo_content as $content ) {
				WP_CLI::runcommand( "import --authors=skip '$content'" );
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
			WP_CLI::line( "\nWhat's next?\n" );
			WP_CLI::line( WP_CLI::colorize( "\n%CCustomize your footer:%n \n" . get_admin_url( null, '/edit.php?post_type=aquamin-general' )) );
			WP_CLI::line( WP_CLI::colorize( "\n%CVisit the pattern library:%n \n" . get_admin_url( null, '/edit.php?post_type=all-the-things' )) );
			WP_CLI::line( "\n" );
		}
	}

}

/**
 * Registers our command when cli get's initialized.
 *
 * @since  1.0.0
 * @author Scott Anderson
 */
add_action( 'cli_init', 'aquamin_cli_register_commands' );
function aquamin_cli_register_commands() {
	WP_CLI::add_command( 'aquamin', 'AQUAMIN_CLI' );
}
