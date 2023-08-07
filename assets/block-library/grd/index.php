<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'aquamin-block-grd-style', get_template_directory_uri() . '/dist/block-library/grd/grd-style.css', null, '1.0' );

// register inner blocks
register_block_type( __DIR__ . '/grd-item' );

// register the block
register_block_type( __DIR__, array(
	'style_handles' => ['aquamin-block-grd-style'],
) );
