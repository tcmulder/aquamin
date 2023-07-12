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
     * Asks a question and return result.
     *
     * @param {string} $question Question to ask the user.
     * @param {string} $guess Optional guess at the user's answer.
     * @param {string} $default Optional default (i.e. passed as cli arguments)
     * @return string
     */
    protected function ask( $question, $guess='', $default=null ) {
		// if user explicitly passed a boolean as a cli option then default to "y"
		if ( 'boolean' === gettype( $default ) ) {
			return 'y';
		// if user explicitly passed a string as a cli option then use it
		} elseif ( $default ) {
			return $default;
		// if the user hasn't defined something via a cli option
		} else {
			// ask the user vie command line
			fwrite( STDOUT, $question . ' ' );
			$answer = trim( fgets( STDIN ) );
			// go with their answer or our guess if they didn't answer
			$answer = $answer ? $answer : $guess;
			// send it!
			return $answer;
		}
    }

	/**
	 * Find-and-replace text in files
	 * 
	 * @param {array}	$files		File paths.
	 * @param {array}	$strings	Array like [[replace, find], [replace, find]].
	 * 
	 * @return null
	 */
	protected function far( $path, $strings ) {
		$files = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $path ) );
		if ( ! empty( $files ) ) {
			foreach( $files as $file ) {
				// perform find and replace
				if ( is_file( $file ) ) {
					$str = file_get_contents( $file );
					foreach ( $strings as $key => $value ) {
						$str = str_replace( $value[ 1 ], $value[ 0 ], $str);
					}
					file_put_contents( $file, $str );
				}
			}
		}
	}

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
     * wp aquamin component
	 *
	 * @param array $modules 
     * @param array $assoc_args 
	 */
	public function create_component( $args, $assoc_args ) {
		
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
		$component = array();
		
		$title = 'My Component';
		$guess = $title;

		$component[ 'component_title' ] = array(
			$this->ask( "Title [$guess]:", $guess, $assoc_args[ 'component_title' ] ?? '' ),
			'template-title',
		);
		$title = $component[ 'component_title' ][ 0 ];
		
		$guess = sanitize_title( $title );
		$component[ 'component_slug' ] = array(
			$this->ask( "Slug [$guess]:", $guess, $assoc_args[ 'component_slug' ] ?? '' ),
			'template-slug',
		);
		$slug = $component[ 'component_slug' ][ 0 ];
		
		$guess = $slug;
		$component[ 'component_dir' ] = array(
			$this->ask( "Directory [$guess]:", $guess, $assoc_args[ 'component_dir' ] ?? '' ),
			'_template-component',
		);

		$exclude = array();

		$ask_js = $this->ask( 'Has front-end JavaScript? [y/N]', 'n', $assoc_args[ 'has_js' ] );
		$exclude['js'] = strtolower( $ask_js ) === 'y' ? false : 'template-slug-script.js';

		$ask_template_part = $this->ask( 'Has PHP template part? [y/N]', 'n', $assoc_args[ 'has_template_part' ] );
		$exclude['template_part'] = strtolower( $ask_template_part ) === 'y' ? false : 'template-slug-markup.php';

		$ask_admin_css = $this->ask( 'Has admin CSS? [y/N]', 'n', $assoc_args[ 'has_admin_css' ] );
		$exclude['admin_css'] = strtolower( $ask_admin_css ) === 'y' ? false : 'template-slug-editor.css';

		/**
		 * Identify paths/dirs
		 * 
		 * Note: all paths end with a trailing /
		 */
		$template_path = get_template_directory();
		$library_path = $template_path . '/components/component-library/';
		$cli_path = $template_path . '/includes/cli/templates/';
		$template_dir = 'component';
		$component_path = $library_path . $slug . '/';
		
		/**
		 * Create plugin directory
		 */
		global $wp_filesystem;
		$wp_filesystem->mkdir( $component_path );

		// duplicate template's files
		copy_dir( $cli_path . $template_dir, $component_path );

		// remove things we're not using
		foreach( $exclude as $filename ) {
			if ( $filename && file_exists( $component_path . $filename ) ) {
				unlink( $component_path . $filename );
			}
		}

		/**
		 * Find and replace strings
		 */
		$component_files = new RecursiveDirectoryIterator( $component_path );
		// loop through new component's directory
		foreach( new RecursiveIteratorIterator( $component_files ) as $file ) {
			// perform find and replace
			if ( is_file( $file ) ) {
				$str = file_get_contents( $file );
				foreach ( $component as $key => $value ) {
					$str = str_replace( $value[ 1 ], $value[ 0 ], $str);
				}
				file_put_contents( $file, $str );
			}
		}

		// loop through the component's directory and replace file prefixes
		foreach( new RecursiveIteratorIterator( $component_files ) as $file ) {
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
		WP_CLI::success( 'Component created' );
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
	 * : Set directory name.
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
	 * [--has_js] 
	 * : Add front-end JavaScript file (set to "n" to prevent)
	 * 
	 * [--is_dynamic] 
	 * : Make it a dynamic block (set to "n" to prevent).
	 * 
     * [--has_inner_block] 
	 * : Include an inner block (set to "n" to prevent).
     *
	 * ## EXAMPLES
     *
     * wp aquamin create block
	 *
	 * @param array $modules 
     * @param array $assoc_args 
	 */
	public function create_block( $args, $assoc_args ) {
		
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
			$this->ask( "Title [$guess]:", $guess, $assoc_args[ 'block_title' ] ?? '' ),
			'template-title',
		);
		$title = $block[ 'block_title' ][ 0 ];
		
		$guess = sanitize_title( $title );
		$block[ 'block_slug' ] = array(
			$this->ask( "Slug [$guess]:", $guess, $assoc_args[ 'block_slug' ] ?? '' ),
			'template-slug',
		);
		$slug = $block[ 'block_slug' ][ 0 ];
		
		$guess = $slug;
		$block[ 'block_dir' ] = array(
			$this->ask( "Directory [$guess]:", $guess, $assoc_args[ 'block_dir' ] ?? '' ),
			'_template-block',
		);
		
		$guess = str_replace(' ', '', $title);
		$block[ 'block_namespace' ] = array(
			$this->ask( "Namespace [$guess]:", $guess, $assoc_args[ 'block_namespace' ] ?? '' ),
			'TemplateNamespace',
		);

		$guess = 'The ' . $title . ' block.';
		$block[ 'block_desc' ] = array(
			$this->ask( "Description [$guess]:", $guess, $assoc_args[ 'block_desc' ] ?? '' ),
			'template-desc',
		);

		$ask_js = $this->ask( 'Has front-end JavaScript? [y/N]', 'n', $assoc_args[ 'has_js' ] );
		$has_js = strtolower( $ask_js ) === 'y' ? true : false;

		$ask_dynamic = $this->ask( 'Dynamic? [y/N]', 'n', $assoc_args[ 'is_dynamic' ] );
		$is_dynamic = strtolower( $ask_dynamic ) === 'y' ? true : false;

		$has_inner_block = false;
		$inner_slug = '';
		if ( ! $is_dynamic ) {

			$ask_inner_block = $this->ask( 'Add inner block? [y/N]', 'n', $assoc_args[ 'has_inner_block' ] );
			$has_inner_block = strtolower( $ask_inner_block ) === 'y' ? true : false;
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
			// copy the script into the block directory
			copy( $cli_path . '/common/template-slug-script.js', $block_path . 'template-slug-script.js' );
			// enqueue it
			$script_replacements = array(
				'index.php-1' => array(
					<<< EOD
					wp_register_style( 'aquamin-block-template-slug-style', get_template_directory_uri() . '/dist/blocks/block-library/template-slug/template-slug-style.css', null, '1.0' );
					wp_register_script( 'aquamin-block-template-slug-script', get_template_directory_uri() . '/dist/blocks/block-library/template-slug/template-slug-script.js', null );
					EOD,
					<<< EOD
					wp_register_style( 'aquamin-block-template-slug-style', get_template_directory_uri() . '/dist/blocks/block-library/template-slug/template-slug-style.css', null, '1.0' );
					EOD
				),
				'index.php-2' => array(
					<<< EOD
					'view_script_handles' => ['aquamin-block-template-slug-script'],
						'style_handles' => ['aquamin-block-template-slug-style']
					EOD,
					<<< EOD
					'style_handles' => ['aquamin-block-template-slug-style']
					EOD
				),
			);
			$this->far( $block_path, $script_replacements );
		}

		/**
		 * Find and replace strings
		 */
		$this->far( $block_path, $block );
		
		/**
		 * Setup inner blocks
		 */
		if ( $has_inner_block ) {

			// register/setup the inner block within parent files
			$inner_block_replacements = array(
				'index.js' => array(
					<<< EOD
					/**
					 * Register inner blocks
					 */
					import './template-item-slug';

					/**
					 * Import dependencies
					 */
					EOD,
					<<< EOD
					/**
					 * Import dependencies
					 */
					EOD
				),
				'index.php' => array(
					<<< EOD
					// register inner blocks
					register_block_type( __DIR__ . '/template-item-slug' );
					
					// register the block
					EOD,
					<<< EOD
					// register the block
					EOD
				),
				'template-slug-edit.js' => array(
					<<< EOD
					<InnerBlocks
						template={[['aquamin/template-item-slug']]}
						allowedBlocks={['aquamin/template-item-slug']}
					/>
					EOD,
					'<InnerBlocks />'
				),
			);
			$this->far( $block_path, $inner_block_replacements );

			// copy the inner blocks directory
			$template_inner_dir = 'block-inner';
			$block_inner_path = $block_path . $inner_slug . '/';
			$wp_filesystem->mkdir( $block_inner_path );
			copy_dir( $cli_path . $template_inner_dir, $block_inner_path );
			
			// loop through block's directory (will include parent block) to find/replace text
			$this->far( $block_path, $inner_block );

		}

		// loop through the block's directory and replace file prefixes
		foreach( new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $block_path ) ) as $file ) {
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
	WP_CLI::add_command( 'aquamin setup', array( 'AQUAMIN_CLI', 'setup' ) );
	WP_CLI::add_command( 'aquamin create block', array( 'AQUAMIN_CLI', 'create_block' ) );
	WP_CLI::add_command( 'aquamin create component', array( 'AQUAMIN_CLI', 'create_component' ) );
}
