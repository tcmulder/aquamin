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
add_action( 'wp_enqueue_scripts', 'aquamin_component_my_component_noninteractive_register_scripts' );
function aquamin_component_my_component_noninteractive_register_scripts() {
	$asset = include AQUAMIN_DIST . '/component-library/my-component-noninteractive/my-component-noninteractive-view.js.asset.php';
	wp_register_script(
		'aquamin-component-my-component-noninteractive-script',
		get_template_directory_uri() . '/dist/component-library/my-component-noninteractive/my-component-noninteractive-view.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
	$asset = include AQUAMIN_DIST . '/component-library/my-component-noninteractive/my-component-noninteractive-view.css.asset.php';
	wp_register_style(
		'aquamin-component-my-component-noninteractive-style',
		get_template_directory_uri() . '/dist/component-library/my-component-noninteractive/my-component-noninteractive-view.css',
		$asset['dependencies'],
		$asset['version'],
		'screen'
	);
}

add_action( 'wp_body_open', 'aquamin_my_component_noninteractive_output' );
function aquamin_my_component_noninteractive_output() {
	if ( 'tests' === get_post_field( 'post_name', get_the_id() ) ) {
		get_template_part( 'dist/component-library/my-component-noninteractive/my-component-noninteractive-view' );
	}
}