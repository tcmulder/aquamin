<?php
/**
 * Gutenberg block setup
 */

// register the block
register_block_type_from_metadata(
	AQUAMIN_BLOCKS . '/block-library/_template-block'
	// , [
	// 	'render_callback' => function( $attributes, $content, $block ) {
	// 		$text = esc_html( $attributes[ 'templateRichText' ] );
	// 		$classes = 'template-slug' . ( $attributes[ 'className' ] ? ' ' . $attributes[ 'className' ] : '' );
	// 		return '<div class="' . $classes . '"><i><b> (dynamic) ' . $text . '</b></i></div>';
	// 	},
	// ]
);

// register child blocks
register_block_type_from_metadata(
	AQUAMIN_BLOCKS . '/block-library/_template-block/template-item-slug'
);
