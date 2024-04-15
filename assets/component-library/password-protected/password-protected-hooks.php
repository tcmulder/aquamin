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
		$asset = include AQUAMIN_DIST . '/component-library/password-protected/password-protected-view.asset.php';
		wp_enqueue_style(
			'aquamin-password-protected-style',
			AQUAMIN_TEMPLATE_URL . '/dist/component-library/password-protected/password-protected-view.css',
			$asset['dependencies'],
			$asset['version'],
			'screen'
		);
	}
}
