<?php
/**
 * Password protected action and filter hooks
 * 
 * This file gets loaded by functions.php, allowing
 * you to keep your hook logic within your component's
 * directory.
 */

/**
 * Enqueue styles if we're on a blog-related page.
 */
add_action( 'wp_enqueue_scripts', 'aquamin_password_protected_scripts' );
function aquamin_password_protected_scripts() {
	if ( post_password_required() ) {
		wp_enqueue_style(
			'aquamin-password-protected-style',
			get_template_directory_uri() . '/dist/component-library/password-protected/password-protected-view.css',
			array(),
			aquamin_cache_break( get_stylesheet_directory() .'/dist/component-library/password-protected/password-protected-view.css' ),
			'screen'
		);
	}
}