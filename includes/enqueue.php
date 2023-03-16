<?php

function aquamin_cache_break(  $path )  {
	// break cache automatically via file save timestamp
	return file_exists( $path ) ? @filemtime( $path ) : 1;
	// /* or... hardcode cache break */ return '1';
}

/**
 * Enqueue front-end styles and scripts
 */
add_action( 'wp_enqueue_scripts', 'aquamin_scripts' );
function aquamin_scripts(){

	wp_enqueue_style(
		'aquamin-style',
		get_template_directory_uri() . '/dist/components/theme.bundle.css',
		array(),
		aquamin_cache_break( get_stylesheet_directory() .'/dist/components/theme.bundle.css' ),
		'screen'
	);
	wp_enqueue_script(
		'aquamin-scripts',
		get_template_directory_uri() . '/dist/components/theme.bundle.js',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/dist/components/theme.bundle.js' ),
		true
	);
	wp_enqueue_style(
		'aquamin-block-style',
		get_template_directory_uri() . '/dist/blocks/blocks.bundle.css',
		array(),
		aquamin_cache_break( get_stylesheet_directory() .'/dist/blocks/blocks.bundle.css' ),
		'screen'
	);
	wp_enqueue_script(
		'aquamin-block-scripts',
		get_template_directory_uri() . '/dist/blocks/blocks.bundle.js',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/dist/blocks/blocks.bundle.js' ),
		true
	);

	/**
	 * Enable ajax support for comments
	 */
	// if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
	//     wp_enqueue_script( 'comment-reply' );
	// }

	/**
	 * Remove unwanted default scripts
	 */
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	// wp_deregister_script( 'wp-embed' ); // optional if unused or concatenated into another script

}

/**
 * Enqueue editor styles and scripts
 */
add_action( 'enqueue_block_editor_assets', 'aquamin_editor_scripts' );
function aquamin_editor_scripts() {

	wp_enqueue_script(
		'aquamin-editor-scripts',
		get_template_directory_uri() . '/dist/blocks/editor.bundle.js',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/dist/blocks/editor.bundle.js' ),
		true
	);
	wp_localize_script( 'aquamin-editor-scripts', 'aquaminLocalizedBlockEditor', array(
		'restUrl' => rtrim( get_rest_url(), '/' ),
		'siteUrl' => rtrim( get_home_url(), '/' ),
	) );
}


/**
 * Enqueue back-end styles and scripts
 */
add_action( 'admin_enqueue_scripts', 'aquamin_admin_scripts' );
function aquamin_admin_scripts() {

	wp_enqueue_style(
		'aquamin-admin-style',
		get_template_directory_uri() . '/admin-style.css',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/admin-style.css' ),
		'screen, projection'
	);

}
