<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'aquamin-block-my-dynamic-block-style', get_template_directory_uri() . '/dist/block-library/my-dynamic-block/my-dynamic-block-style.css', null, '1.0' );
wp_register_script( 'aquamin-block-my-dynamic-block-script', get_template_directory_uri() . '/dist/block-library/my-dynamic-block/my-dynamic-block-script.js', null, '1.0', true );

// register the block
register_block_type(
	__DIR__, array(
		'style_handles' => ['aquamin-block-my-dynamic-block-style'],
		'view_script_handles' => ['aquamin-block-my-dynamic-block-script'],
		'render_callback' => function( $attributes, $content, $block ) {
			ob_start();
			get_template_part(
				'assets/block-library/' . basename( __DIR__ ) . '/my-dynamic-block-markup',
				null,
				array(
					'attributes' => $attributes,
					'content'    => $content,
					'block'      => $block,
				)
			);
			return ob_get_clean();
		},
	)
);
