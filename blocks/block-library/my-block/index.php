<?php
/**
 * Gutenberg block setup
 */

// register the block
register_block_type_from_metadata(
	AQUAMIN_BLOCKS . '/block-library/my-block', [
		'render_callback' => function( $attributes, $content, $block ) {
			ob_start();
			get_template_part(
				'blocks/block-library/my-block/markup',
				null,
				[
					'class_name' => 'foo',
					'attributes' => $attributes,
					'content'    => $content,
					'block'      => $block,
				]
			);
			return ob_get_clean();
		},
	]
);
