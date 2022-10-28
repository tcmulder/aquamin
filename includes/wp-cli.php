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
     * @param $question
     *
     * @return string
     */
    protected function ask( $question ) {
        // Adding space to question and showing it.
        fwrite( STDOUT, $question . ' ' );
        return trim( fgets( STDIN ) );
    }

	/**
	 * Creates a block
	 *
	 * @since  1.0.0
	 * @author @tcmulder
	 */
	public function block( $args, $assoc_args ) {
		// exit if we can't edit the filesystem
		if ( ! WP_Filesystem() ) {
			WP_CLI::error( 'Unable to access filesystem' );
			exit;
		}
		// identify paths
		$blocks_path = get_template_directory() . '/blocks/block-library/';
		$blocks_template = '_template-block';
		
		// get block details
		WP_CLI::line( 'Enter block details' );
		$block = array();
		$block[ 'block_slug' ] = array(
			$assoc_args[ 'block_slug' ] ?? $this->ask('Slug (e.g. my-block):'),
			'template-slug',
		);
		$block[ 'block_dir' ] = array(
			$assoc_args[ 'block_dir' ] ?? $this->ask('Directory (e.g. my-block):'),
			'_template-block',
		);
		$block[ 'block_namespace' ] = array(
			$assoc_args[ 'block_namespace' ] ?? $this->ask('Namespace (e.g. MyBlock):'),
			'TemplateNamespace',
		);
		$block[ 'block_title' ] = array(
			$assoc_args[ 'block_title' ] ?? $this->ask('Title (e.g. My Block):'),
			'template-title',
		);
		$block[ 'block_desc' ] = array(
			$assoc_args[ 'block_desc' ] ?? $this->ask('Description (e.g. My cool block.):'),
			'template-desc',
		);

		// see if we're doing an inner block
		$ask_inner_block = $this->ask('Add inner block? [y/n]');
		$has_inner_block = $ask_inner_block === 'y' ? true : false;
		
		if ( $has_inner_block ) {
			$block[ 'inner_block_slug' ] = array(
				$assoc_args[ 'inner_block_slug' ] ?? $this->ask('Inner block slug (e.g. my-block-item):'),
				'template-item-slug',
			);
			$block[ 'inner_block_namespace' ] = array(
				$assoc_args[ 'inner_block_namespace' ] ?? $this->ask('Inner block namespace (e.g. MyBlockItem):'),
				'TemplateItemNamespace',
			);
			$block[ 'inner_block_title' ] = array(
				$assoc_args[ 'inner_block_title' ] ?? $this->ask('Inner block title (e.g. My Block Item):'),
				'template-item-title',
			);
			$block[ 'inner_block_desc' ] = array(
				$assoc_args[ 'inner_block_desc' ] ?? $this->ask('Inner block description (e.g. My cool block item.):'),
				'template-item-desc',
			);
		}

		// ensure we have all block info
		$has_error = false;
		foreach ( $block as $key => $value ) {
			if ( ! isset( $value[ 0 ] ) || $value[ 0 ] === '' ) {
				$has_error = true;
				WP_CLI::error( 'Value for --' . $key . ' is required' );
			}
		}
		if ( $has_error ) {
			exit;
		}
		
		// create the plugin directory
		$block_slug = $block[ 'block_slug' ][ 0 ];
		global $wp_filesystem;
		$wp_filesystem->mkdir( $blocks_path . $block_slug );

		// duplicate template's files
		copy_dir( $blocks_path . $blocks_template, $blocks_path . $block_slug);

		// maybe remove or rename inner block directory
		if ( $has_inner_block ) {
			rename(
				$blocks_path . $block_slug . '/' . $block[ 'inner_block_slug' ][ 1 ],
				$blocks_path . $block_slug . '/' . $block[ 'inner_block_slug' ][ 0 ]
			);
		} else {
			$inner_block_dir = $blocks_path . $block_slug . '/template-item-slug/';
			array_map( 'unlink', glob( "$inner_block_dir/*.*" ) );
			rmdir( $inner_block_dir );
		}

		// loop through new block's directory
		$block_files = new RecursiveDirectoryIterator($blocks_path . $block_slug);
		foreach( new RecursiveIteratorIterator( $block_files ) as $file ) {
			// perform find and replace
			if ( is_file( $file ) ) {
				$str = file_get_contents( $file );
				foreach ( $block as $key => $value ) {
					$str = str_replace( $value[ 1 ], $value[ 0 ], $str);
					// TODO: make this more efficient (maybe have array pairs to replace more than one thing)
					if ( ! $has_inner_block ) {
						$str = str_replace( "import './template-item-slug';", '// none', $str);
					}
				}
				file_put_contents( $file, $str );
			}
		}

		// report
		WP_CLI::success( 'Block created' );
	}

	/**
	 * Sets up theme
	 *
	 * @since  1.0.0
	 * @author @tcmulder
	 */
	public function setup( $args, $assoc_args ) {

		// we don't have errors yet
		$has_error = false;

		// install pattern library if not already done
		WP_CLI::runcommand( 'plugin is-installed all-the-things || wp plugin install --activate https://github.com/tcmulder/all-the-things/archive/refs/heads/master.zip' );
		
		// get demo content files
		$demo_content_path = get_template_directory() . '/demo-content/';
		$demo_content = glob($demo_content_path . '*');
		if ( $demo_content ) {
			// determine if the importer is installed and install it if not
			$import_plugin_path = WP_CLI::runcommand( 'plugin path wordpress-importer', array( 'return' => true, 'exit_error' => false ) );
			if ( ! $import_plugin_path ) WP_CLI::runcommand( 'plugin install wordpress-importer --activate' );
			// import all the content
			foreach( $demo_content as $content ) {
				WP_CLI::runcommand( 'import --authors=skip ' . $content );
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
			WP_CLI::line( WP_CLI::colorize( "%CPatterns URL:%n \n" . get_admin_url( null, '/edit.php?post_type=all-the-things' ) . "\n" ) );
			WP_CLI::line( WP_CLI::colorize( "%CFooter URL:%n \n" . get_admin_url( null, '/edit.php?post_type=aquamin-general' ) . "\n" ) );
			WP_CLI::success( 'Setup complete' );
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
