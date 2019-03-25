<?php
/**
 * Enqueue front-end scripts and styles.
 */
add_action( 'wp_enqueue_scripts', 'aquamin_scripts' );
function aquamin_scripts(){

	/**
	 * Configure styles
	 */
	wp_register_style( 'aquamin-style', get_template_directory_uri() . '/style.css', array(), '1.0.0','screen, projection' );

	/**
	 * Load styles
	 */
	wp_enqueue_style( 'aquamin-style' );

	/**
	 * Configure scripts
	 */
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js', false, '1.10.1', true );
	wp_register_script( 'aquamin-scripts', get_template_directory_uri() . '/js/scripts.min.js', false, '1.0.0', true );

	/**
	 * Load relevant scripts
	 */
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'aquamin-scripts' );

	/**
	 * Enable ajax support for comments
	 */
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
	    wp_enqueue_script( 'comment-reply' );
	}

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
 * Enqueue back-end scripts and styles
 */
add_action('admin_enqueue_scripts', 'aquamin_admin_scripts');
function aquamin_admin_scripts() {

	/**
	 * Load back-end styles
	 */
	wp_enqueue_style( 'aquamin-admin-style', get_template_directory_uri() . '/admin-style.css', false, '1.0.0', 'screen, projection' );

}