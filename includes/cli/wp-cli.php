<?php
/*
Plugin Name: Aquamin WP-CLI Helpers
Plugin URI: https://www.thinkaquamarine.com
Description: WP-CLI helpers for working with the aquamin theme.
Author: @tcmulder
Version: 2.0.0
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
     * @param   string  $question  Question to ask the user.
     * @param   string  $guess     Optional guess at the user's answer.
     * @param   string  $default   Optional default (i.e. passed as cli arguments)
     * @return  string/bool        Returns answer as string, or boolean if "y" or "n".
     */
    protected function ask( $question, $guess='', $default=null ) {
		$answer = null;
		// if user explicitly passed a boolean as a cli option then default to "y"
		if ( 'boolean' === gettype( $default ) ) {
			$answer = 'y';
		// if user explicitly passed a string as a cli option then use it
		} elseif ( $default ) {
			$answer = $default;
		// if the user hasn't defined something via a cli option then ask for input
		} else {
			fwrite( STDOUT, $question . ' ' );
			$input = trim( fgets( STDIN ) );
			// go with their answer or our guess if they didn't answer
			$input = $input ? $input : $guess;
			$answer = $input;
		}
		// sanitize user input
		$answer = esc_html( $answer );
		// handle "y" and "n" boolean answers (assumes guess is either "n" or "y")
		if ( 'n' === $guess || 'y' === $guess ) {
			$answer = strtolower( $answer ) === 'y' ? true : false;
		}
		$this->debug( "Question: \"$question\"", " Answer: \"", $answer, "\"" );
		return $answer;
    }

	/**
	 * Find-and-replace text in files
	 * 
	 * @param   array  $files  File paths.
	 * @param   array  $far    Array like ['find' => 'look for', 'repl' => 'replace with].
	 * @return  null
	 */
	protected function far( $path, $far ) {
		$files = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $path ) );
		if ( ! empty( $files ) && ! empty( $far ) ) {
			foreach( $files as $file ) {
				if ( is_file( $file ) ) {
					$str = file_get_contents( $file );
					foreach ( $far as $arr ) {
						$str = str_replace( $arr[ 'find' ], $arr[ 'repl' ], $str );
						$this->debug( 'Replacing ', $arr[ 'find' ], ' with ', $arr[ 'repl' ], ' in ', $file->getBasename() );
					}
					file_put_contents( $file, $str );
				}
			}
		}
	}

	/**
	 * Build find-and-replace array.
	 * 
	 * @param   array   $far   Array of find-and-replace values (passed by reference).
	 * @param   array   $args  Arguments like ['question', 'guess', 'find', 'default'].
	 * @return  string         Value of the answer to the question.
	 */
	protected function build_far( &$far, $args ) {
		$question = str_replace( '[guess]', '[' . $args['guess'] . ']', $args['question'] );
		$repl = $this->ask( $question, $args['guess'], $args['default'] );
		array_push( $far, array( 'find' => $args['find'], 'repl' => $repl ) );
		$this->debug( 'Will replace ', $args['find'], ' with ', $repl );
		return $repl;
	}

	/**
	 * Build excluded files list.
	 * 
	 * @param   array   $exclude  Array of files to exclude/delete (passed by reference).
	 * @param   array   $args     Arguments like ['question', 'guess', 'filename', 'default'].
	 * @return  bool              True if excluding, false if including.
	 */
	protected function exclude( &$exclude, $args ) {
		$question = str_replace( '[guess]', '[' . $args['guess'] . ']', $args['question'] );
		$dont_exclude = $this->ask( $question, $args['guess'], $args['default'] );
		if ( ! $dont_exclude  ) {
			array_push( $exclude, $args['filename'] );
			$this->debug( 'Will exclude ', $args['filename'] );
		} else {
			$this->debug( 'Will include ', $args['filename'] );
		}
		return $dont_exclude;
	}

	/**
	 * Add prefix to filenames
	 * 
	 * @param   string  $path  Path to files we're renaming.
	 * @param   string  $find  String to find.
	 * @param   string  $repl  Replacement string.
	 * @return  null
	 */
	protected function prefix( $path, $find, $repl ) {
		foreach( new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $path ) ) as $file ) {
			if ( is_file( $file ) ) {
				$file_name = basename( $file );
				if ( str_starts_with( $file_name, $find ) ) {
					$new_file = str_replace( $find, $repl, $file );
					$this->debug( 'Renaming ', $file_name, ' to ', basename( $new_file ), ' in ', dirname( $file ) );
					rename( $file, $new_file );
				}
			}
		}
	}

	/**
	 * Output debug info
	 * 
	 * Run wp-cli with flag --debug to
	 * enable debugging messages. Enter
	 * as many mixed arguments as you'd
	 * like to output.
	 * 
	 * @return null
	 */
	protected function debug() {
		$msg = '';
		$args = func_get_args();
		foreach( $args as $info ) {
			$type = gettype( $info );
			if ( 'array' === $type || 'object' === $type ) {
				$msg .= "\n";
			}
			$msg .= print_r( $info, 1 );
		}
		WP_CLI::debug( $msg, 'aquamin' );
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
     * wp aquamin component create
	 *
	 * @param array $modules 
     * @param array $assoc_args 
	 * @return null
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
		$far = array(); // array os strings to find and replace
		$exclude = array(); // files to exclude from scaffold

		$title = $this->build_far( $far, array(
			'question'   => 'Title [guess]:',
			'guess'      => 'My Component',
			'find'       => 'template-title',
			'default'    => $assoc_args[ 'component_title' ] ?? '',
		) );
		$slug = $this->build_far( $far, array(
			'question'   => 'Slug [guess]:',
			'guess'      => sanitize_title( $title ),
			'find'       => 'template-slug',
			'default'    => $assoc_args[ 'component_slug' ] ?? '',
		) );
		$dir = $this->build_far( $far, array(
			'question'   => 'Directory [guess]:',
			'guess'      => $slug,
			'find'       => '_template-component',
			'default'    => $assoc_args[ 'component_dir' ] ?? '',
		) );
		$this->exclude( $exclude, array(
			'question'   => 'Has front-end JavaScript? [y/N]',
			'guess'      => 'n',
			'filename'   => 'template-slug-script.js',
			'default'    => $assoc_args[ 'has_js' ] ?? '',
		) );
		$has_template_part = $this->exclude( $exclude, array(
			'question'   => 'Has PHP template part? [y/N]',
			'guess'      => 'n',
			'filename'   => 'template-slug-markup.php',
			'default'    => $assoc_args[ 'has_template_part' ] ?? '',
		) );
		$this->exclude( $exclude, array(
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
		$this->far( $component_path, $far );

		// loop through the component's directory and replace file prefixes
		$this->prefix( $component_path, 'template-slug', $slug );

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
	 * [--has_inner_block] 
	 * : Include an inner block (set to "n" to prevent).
	 * 
	 * [--inner_block_title] 
	 * : Set inner block title.
	 * 
	 * [--inner_block_slug] 
	 * : Set inner block slug.
	 * 
	 * [--inner_block_dir] 
	 * : Set inner block directory nae.
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
	 * ## EXAMPLES
     *
     * wp aquamin block create
	 *
	 * @param array $modules
     * @param array $assoc_args
	 * @return null
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
		$far = array(); // array os strings to find and replace
		$exclude = array(); // files to exclude from scaffold
		
		$title = $this->build_far( $far, array(
			'question'   => 'Title [guess]:',
			'guess'      => 'My Block',
			'find'       => 'template-title',
			'default'    => $assoc_args[ 'block_title' ] ?? '',
		) );
		$slug = $this->build_far( $far, array(
			'question'   => 'Slug [guess]:',
			'guess'      => sanitize_title( $title ),
			'find'       => 'template-slug',
			'default'    => $assoc_args[ 'block_slug' ] ?? '',
		) );
		$dir = $this->build_far( $far, array(
			'question'   => 'Directory [guess]:',
			'guess'      => $slug,
			'find'       => '_template-block',
			'default'    => $assoc_args[ 'block_dir' ] ?? '',
		) );
		$this->build_far( $far, array(
			'question'   => 'Namespace [guess]:',
			'guess'      => str_replace(' ', '', $title),
			'find'       => 'TemplateNamespace',
			'default'    => $assoc_args[ 'block_namespace' ] ?? '',
		) );
		$this->build_far( $far, array(
			'question'   => 'Description [guess]:',
			'guess'      => 'The ' . $title . ' block.',
			'find'       => 'template-desc',
			'default'    => $assoc_args[ 'block_desc' ] ?? '',
		) );
		$has_js = $this->exclude( $exclude, array(
			'question'   => 'Has front-end JavaScript? [y/N]',
			'guess'      => 'n',
			'filename'   => 'template-slug-script.js',
			'default'    => $assoc_args[ 'has_js' ] ?? '',
		) );
		$is_dynamic = $this->ask( 'Dynamic? [y/N]', 'n', $assoc_args[ 'is_dynamic' ] ?? '' );
		
		$has_inner_block = ! $is_dynamic && $this->ask( 'Add inner block? [y/N]', 'n', $assoc_args[ 'has_inner_block' ] ?? '' );
		$inner_slug = '';
		$inner_path = '';
		if ( $has_inner_block ) {
			$inner_title = $this->build_far( $far, array(
				'question'   => 'Inner Block Title [guess]:',
				'guess'      => $title . ' Item',
				'find'       => 'template-item-title',
				'default'    => $assoc_args[ 'inner_block_title' ] ?? '',
			) );
			$inner_slug = $this->build_far( $far, array(
				'question'   => 'Inner Block Slug [guess]:',
				'guess'      => sanitize_title( $inner_title ),
				'find'       => 'template-item-slug',
				'default'    => $assoc_args[ 'inner_block_slug' ] ?? '',
			) );
			$inner_path = $this->build_far( $far, array(
				'question'   => 'Inner Block Directory [guess]:',
				'guess'      => $inner_slug,
				'find'       => '_template-item-dir',
				'default'    => $assoc_args[ 'inner_block_dir' ] ?? '',
			) );
			$this->build_far( $far, array(
				'question'   => 'Inner Block Namespace [guess]:',
				'guess'      => str_replace(' ', '', $inner_title),
				'find'       => 'TemplateItemNamespace',
				'default'    => $assoc_args[ 'inner_block_namespace' ] ?? '',
			) );
			$this->build_far( $far, array(
				'question'   => 'Inner Block Description [guess]:',
				'guess'      => 'The ' . $inner_title . ' nested block.',
				'find'       => 'template-item-desc',
				'default'    => $assoc_args[ 'inner_block_desc' ] ?? '',
			) );
		}

		/**
		 * Identify paths/dirs
		 * 
		 * Note: all paths end with a trailing /
		 */
		$template_path = get_template_directory();
		$library_path = $template_path . '/assets/block-library/';
		$cli_path = $template_path . '/includes/cli/templates/';
		$template_dir = '';
		if ( $is_dynamic ) {
			$template_dir = 'block-dynamic';
		} else {
			$template_dir = 'block';
		}
		$block_path = $library_path . $dir . '/';
		
		/**
		 * Create plugin directory
		 */
		global $wp_filesystem;
		$wp_filesystem->mkdir( $block_path );

		// duplicate template's files
		copy_dir( $cli_path . $template_dir, $block_path, $exclude );
		
		// enqueue front-end scripts if appropriate (unshift to top of array so template strings get replaced)
		array_unshift( $far, array(
			'find' => "/* PLACEHOLDER: enqueue front-end script */\n",
			'repl' => ! $has_js ? "" : "wp_register_script( 'aquamin-block-template-slug-script', get_template_directory_uri() . '/dist/block-library/template-slug/template-slug-script.js', null, '1.0', true );\n",
		) );
		array_unshift( $far, array(
			'find' => "\t/* PLACEHOLDER: add front-end script handle */\n",
			'repl' => ! $has_js ? "" : "\t'view_script_handles' => ['aquamin-block-template-slug-script'],\n",
		) );
		array_unshift( $far, array(
			'find' => "\t\t/* PLACEHOLDER: add dynamic front-end script handle */\n",
			'repl' => ! $has_js ? "" : "\t\t'view_script_handles' => ['aquamin-block-template-slug-script'],\n",
		) );
		
		/**
		 * Setup inner blocks
		 */
		// copy the inner blocks directory
		if ( $has_inner_block ) {
			$template_inner_dir = 'block-inner';
			$block_inner_path = $block_path . $inner_path . '/';
			$wp_filesystem->mkdir( $block_inner_path );
			copy_dir( $cli_path . $template_inner_dir, $block_inner_path, $exclude );
		}
		// add inner find-and-replace strings (unshift to top of array so template strings get replaced)
		array_unshift( $far, array(
			'find' => "\n/* PLACEHOLDER: register inner blocks */\n",
			'repl' => ! $has_inner_block ? "" : "\n/**\n * Register inner blocks\n */\nimport './_template-item-dir';\n"
		) );
		array_unshift( $far, array(
			'find' => "\n/* PLACEHOLDER: register inner block */\n",
			'repl' => ! $has_inner_block ? "" : "\n// register inner blocks\nregister_block_type( __DIR__ . '/_template-item-dir' );\n"
		) );
		array_unshift( $far, array(
			'find' => " /* PLACEHOLDER: inner blocks template */ ",
			'repl' => ! $has_inner_block ? " " : "\n\t\t\t\ttemplate={[['aquamin/template-item-slug']]}\n\t\t\t\tallowedBlocks={['aquamin/template-item-slug']}\n\t\t\t"
		) );
		
		/**
		 * Perform the find-and-replace for strings
		 */
		$this->far( $block_path, $far );

		/**
		 * Prefix filenames
		 */
		$this->prefix( $block_path, 'template-slug', $slug );
		if ( $has_inner_block ) {
			$this->prefix( $block_inner_path, 'template-item-slug', $inner_slug );
		}

		// report
		WP_CLI::success( 'Block created' );
		WP_CLI::line( WP_CLI::colorize( "\n%6%k What's next? %n\n" ) );
		WP_CLI::line( WP_CLI::colorize( "%C ‣ Restart Parcel and refresh your browser to watch these new files") );
		WP_CLI::line( WP_CLI::colorize( "%C ‣ Edit your new $title block:%n $block_path") );
		WP_CLI::line( "\n" );
	}

	/**
	 * Sets up default content
	 *
	 * @param array $modules
     * @param array $assoc_args
	 * @return null
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
			WP_CLI::line( WP_CLI::colorize( "\n%6%k What's next? %n\n" ) );
			WP_CLI::line( WP_CLI::colorize( "%C ‣ Customize your footer:%n \n" . get_admin_url( null, '/edit.php?post_type=aquamin-general' ) ) );
			WP_CLI::line( WP_CLI::colorize( "%C ‣ Visit the pattern library:%n \n" . get_admin_url( null, '/edit.php?post_type=all-the-things' ) ) );
			WP_CLI::line( "\n" );
		}
	}

}

/**
 * Register commands when cli gets initialized
 */
add_action( 'cli_init', 'aquamin_cli_register_commands' );
function aquamin_cli_register_commands() {
	WP_CLI::add_command( 'aquamin setup', array( 'AQUAMIN_CLI', 'setup' ) );
	WP_CLI::add_command( 'aquamin block create', array( 'AQUAMIN_CLI', 'create_block' ) );
	WP_CLI::add_command( 'aquamin component create', array( 'AQUAMIN_CLI', 'create_component' ) );
}
