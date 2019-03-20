<?php
/**
 * Enqueue scripts and styles.
 */
add_action( 'wp_enqueue_scripts', 'aquamin_scripts' );
function aquamin_scripts(){

	// Configure styles
	wp_register_style( 'aquamin-style', get_template_directory_uri() . '/style.css', array(), '1.0','screen, projection' );

	// Load styles
	wp_enqueue_style( 'aquamin-style' );

	// Configure scripts
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js', false, '1.10.1', true );
	wp_register_script( 'aquamin-scripts', get_template_directory_uri() . '/js/scripts.min.js', false, '1.0.0', true );

	// Load relevant scripts
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'aquamin-scripts' );

	// Enable ajax support for comments
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
	    wp_enqueue_script( 'comment-reply' );
	}
}
