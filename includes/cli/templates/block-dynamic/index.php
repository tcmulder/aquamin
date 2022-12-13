<?php
/**
 * Gutenberg block setup
 */

// register the block
register_block_type_from_metadata(
	dirname( __FILE__ ), [
		'render_callback' => function( $attributes, $content, $block ) {
			ob_start();
			get_template_part(
				'blocks/block-library/' . basename( dirname( __FILE__ ) ) . '/markup',
				null,
				[
					'attributes' => $attributes,
					'content'    => $content,
					'block'      => $block,
				]
			);
			return ob_get_clean();
		},
	]
);
