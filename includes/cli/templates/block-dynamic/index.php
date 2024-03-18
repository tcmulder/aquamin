<?php
/**
 * Gutenberg block setup
 */

// enqueue block assets
wp_register_style( 'aquamin-block-template-slug-style', get_template_directory_uri() . '/dist/block-library/template-slug/template-slug-style.css', null, '1.0' );
/* PLACEHOLDER: enqueue front-end script */

// register the block
register_block_type(
	__DIR__, array(
		'style_handles' => ['aquamin-block-template-slug-style'],
		/* PLACEHOLDER: add dynamic front-end script handle */
		'render_callback' => function( $attributes, $content, $block ) {
			ob_start();
			get_template_part(
				'assets/block-library/' . basename( __DIR__ ) . '/template-slug-render',
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
