<?php
/**
 * WordPress actions and filters
 * 
 * This file is included in functions.php so you
 * can add your actions and filters here in the
 * block or component's directory rather than
 * outside of it.
 */

/**
 * Register component styles and/or scripts
 */
add_action( 'wp_enqueue_scripts', 'aquamin_component_my_component_wpcli_register_scripts' );
function aquamin_component_my_component_wpcli_register_scripts() {
	$asset = include AQUAMIN_DIST . '/component-library/my-component-wpcli/my-component-wpcli-view.css.asset.php';
	wp_register_style(
		'aquamin-component-my-component-wpcli-style',
		get_template_directory_uri() . '/dist/component-library/my-component-wpcli/my-component-wpcli-view.css',
		$asset['dependencies'],
		$asset['version'],
		'screen'
	);
	$asset = include AQUAMIN_DIST . '/component-library/my-component-wpcli/my-component-wpcli-view.asset.php';
	wp_register_script(
		'aquamin-component-my-component-wpcli-script',
		get_template_directory_uri() . '/dist/component-library/my-component-wpcli/my-component-wpcli-view.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
