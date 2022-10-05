<?php
/**
 * Gutenberg block setup
 */

// register the block
register_block_type_from_metadata(
	AQUAMIN_BLOCKS . '/block-library/inline-paragraph'
	, [
		'render_callback' => function( $attributes, $content, $block ) {
			// remove inner paragraphs
			$content = preg_replace(
				array( '/<p/i', '/<\/p>/i', "/\n/" ),
				array( '<span', '</span>', '' ),
				$content ?? ''
			);
			// send it!
			return '<p class="inline-paragraph ' . ( $block->parsed_block['attrs']['className'] ?? '' ) . '">' . $content . '</p>';
		},
	]
);

// register child blocks
register_block_type_from_metadata(
	AQUAMIN_BLOCKS . '/block-library/inline-paragraph/copyright-year'
	, [
		'render_callback' => function( $attributes, $content, $block ) {
			return date( 'Y' );
		},
	]
);
