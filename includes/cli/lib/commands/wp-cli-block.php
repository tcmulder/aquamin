<?php
/**
 * Work with blocks in aquamin.
 * 
 * @package AquaminCLI
 */

namespace AquaminCLI\Block;

use WP_CLI;
use AquaminCLI\Util;

defined( 'ABSPATH' ) || exit; // exit if accessed directly

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
function block_create( $args, $assoc_args ) {
	
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
	
	$title = Util\build_far( $far, array(
		'question'   => 'Title [guess]:',
		'guess'      => 'My Block',
		'find'       => 'template-title',
		'default'    => $assoc_args[ 'block_title' ] ?? '',
	) );
	$slug = Util\build_far( $far, array(
		'question'   => 'Slug [guess]:',
		'guess'      => sanitize_title( $title ),
		'find'       => 'template-slug',
		'default'    => $assoc_args[ 'block_slug' ] ?? '',
	) );
	$dir = Util\build_far( $far, array(
		'question'   => 'Directory [guess]:',
		'guess'      => $slug,
		'find'       => '_template-block',
		'default'    => $assoc_args[ 'block_dir' ] ?? '',
	) );
	Util\build_far( $far, array(
		'question'   => 'Namespace [guess]:',
		'guess'      => str_replace(' ', '', $title),
		'find'       => 'TemplateNamespace',
		'default'    => $assoc_args[ 'block_namespace' ] ?? '',
	) );
	Util\build_far( $far, array(
		'question'   => 'Description [guess]:',
		'guess'      => 'The ' . $title . ' block.',
		'find'       => 'template-desc',
		'default'    => $assoc_args[ 'block_desc' ] ?? '',
	) );
	$has_js = Util\exclude( $exclude, array(
		'question'   => 'Has front-end JavaScript? [y/N]',
		'guess'      => 'n',
		'filename'   => 'template-slug-view.js',
		'default'    => $assoc_args[ 'has_js' ] ?? '',
	) );
	$is_dynamic = Util\ask( 'Dynamic? [y/N]', 'n', $assoc_args[ 'is_dynamic' ] ?? '' );
	
	$has_inner_block = ! $is_dynamic && Util\ask( 'Add inner block? [y/N]', 'n', $assoc_args[ 'has_inner_block' ] ?? '' );
	$inner_slug = '';
	$inner_path = '';
	if ( $has_inner_block ) {
		$inner_title = Util\build_far( $far, array(
			'question'   => 'Inner Block Title [guess]:',
			'guess'      => $title . ' Item',
			'find'       => 'template-item-title',
			'default'    => $assoc_args[ 'inner_block_title' ] ?? '',
		) );
		$inner_slug = Util\build_far( $far, array(
			'question'   => 'Inner Block Slug [guess]:',
			'guess'      => sanitize_title( $inner_title ),
			'find'       => 'template-item-slug',
			'default'    => $assoc_args[ 'inner_block_slug' ] ?? '',
		) );
		$inner_path = Util\build_far( $far, array(
			'question'   => 'Inner Block Directory [guess]:',
			'guess'      => $inner_slug,
			'find'       => '_template-item-dir',
			'default'    => $assoc_args[ 'inner_block_dir' ] ?? '',
		) );
		Util\build_far( $far, array(
			'question'   => 'Inner Block Namespace [guess]:',
			'guess'      => str_replace(' ', '', $inner_title),
			'find'       => 'TemplateItemNamespace',
			'default'    => $assoc_args[ 'inner_block_namespace' ] ?? '',
		) );
		Util\build_far( $far, array(
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
		'find' => "\t/* TEMPLATE: enqueue front-end script */\n",
		'repl' => ! $has_js ? "" : "\t\"viewScript\": [\"file:../../../dist/block-library/_template-block/template-slug-view.js\"],\n",
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
		'find' => "\n/* TEMPLATE: register inner blocks */\n",
		'repl' => ! $has_inner_block ? "" : "\n/**\n * Register inner blocks\n */\nimport './_template-item-dir';\n"
	) );
	array_unshift( $far, array(
		'find' => " /* TEMPLATE: inner blocks template */",
		'repl' => ! $has_inner_block ? "" : ", {\n\t\ttemplate: [['aquamin/template-item-slug']],\n\t\tallowedBlocks: ['aquamin/template-item-slug'],\n\t}"
	) );
	
	/**
	 * Perform the find-and-replace for strings
	 */
	Util\far( $block_path, $far );

	/**
	 * Prefix filenames
	 */
	Util\prefix( $block_path, 'template-slug', $slug );
	if ( $has_inner_block ) {
		Util\prefix( $block_inner_path, 'template-item-slug', $inner_slug );
	}

	// report
	WP_CLI::success( 'Block created' );
	WP_CLI::line( WP_CLI::colorize( "\n%6%k What's next? %n\n" ) );
	WP_CLI::line( WP_CLI::colorize( "%C ‣ Restart Parcel and refresh your browser to watch these new files") );
	WP_CLI::line( WP_CLI::colorize( "%C ‣ Edit your new $title block:%n $block_path") );
	WP_CLI::line( "\n" );

}
