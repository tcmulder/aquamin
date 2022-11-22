<?php
/**
 * Gutenberg block setup
 */

// register the block
register_block_type_from_metadata(
	AQUAMIN_BLOCKS . '/block-library/_template-block'
);

// register child blocks
register_block_type_from_metadata(
	AQUAMIN_BLOCKS . '/block-library/_template-block/template-item-slug'
);
