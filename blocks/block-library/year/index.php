<?php
/**
 * Gutenberg block setup
 */

// register the block
register_block_type_from_metadata(
	AQUAMIN_BLOCKS . '/block-library/year'
	, [
		'render_callback' => function( $attributes, $content, $block ) {
			$classes = ( $block->parsed_block['attrs']['className'] ?? '' );
			$class_attribute = ( $classes ? ' class="' . $classes . '"' : '' );
			return '<span' . $class_attribute . '>' . date( 'Y' ) . '</span>';
		},
	]
);
