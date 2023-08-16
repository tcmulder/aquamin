<?php

/**
 * Break file cache by appending `?ver={timestamp}` to the URL.
 * 
 * Note: if you'd rather manually break cache, just
 * replace the return line with e.g. `return '1.0.0'`.
 * 
 * @param  string  $path  File URI.
 * @return string         File URI with cache break appended.
 */
function aquamin_cache_break(  $path )  {
	return file_exists( $path ) ? @filemtime( $path ) : 1;
}

/**
 * Enqueue theme front-end styles and scripts
 */
add_action( 'wp_enqueue_scripts', 'aquamin_scripts' );
function aquamin_scripts() {

	wp_enqueue_style(
		'aquamin-style',
		get_template_directory_uri() . '/dist/bundles/theme.bundle.css',
		array(),
		aquamin_cache_break( get_stylesheet_directory() .'/dist/bundles/theme.bundle.css' ),
		'screen'
	);
	wp_enqueue_script(
		'aquamin-scripts',
		get_template_directory_uri() . '/dist/bundles/theme.bundle.js',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/dist/bundles/theme.bundle.js' ),
		true
	);
	wp_enqueue_style(
		'aquamin-block-style',
		get_template_directory_uri() . '/dist/bundles/blocks.bundle.css',
		array(),
		aquamin_cache_break( get_stylesheet_directory() .'/dist/bundles/blocks.bundle.css' ),
		'screen'
	);
	wp_enqueue_script(
		'aquamin-block-scripts',
		get_template_directory_uri() . '/dist/bundles/blocks.bundle.js',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/dist/bundles/blocks.bundle.js' ),
		true
	);

}

/**
 * Disable unwanted WordPress scripts
 */
add_action( 'wp_enqueue_scripts', 'aquamin_disable_scripts' );
function aquamin_disable_scripts() {

	wp_deregister_script( 'wp-embed' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'rsd_link' );
	add_filter( 'tiny_mce_plugins', function ( $plugins ) {
		if ( is_array( $plugins ) && in_array( 'wpemoji', $plugins, true ) ) {
			return array_diff( $plugins, array( 'wpemoji' ) );
		}
		return $plugins;
	} );
	add_filter( 'wp_resource_hints', function( $urls, $relation_type ) {
		if ( 'dns-prefetch' === $relation_type ) {
			$urls = array_values( array_diff( $urls, array( apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' ) ) ) );
		}
		return $urls;
	}, 10, 2 );

}