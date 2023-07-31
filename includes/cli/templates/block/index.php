<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'aquamin-block-template-slug-style', get_template_directory_uri() . '/dist/block-library/template-slug/template-slug-style.css', null, '1.0' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['aquamin-block-template-slug-style']
) );
