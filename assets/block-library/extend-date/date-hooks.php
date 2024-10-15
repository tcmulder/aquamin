<?php 
/**
 * Customize render of some blocks
 */
add_filter( 'render_block', 'aquamin_customize_blocks', 9, 3 );
function aquamin_customize_blocks( $block_content, $block ) {
	if ( 'core/post-date' === $block['blockName'] ) {
		// $attr = 
		// output current year (e.g. for footer copyright) if has setting checked to do so
		if ( $block['attrs']['aquaminClassNameCurrentYear'] ?? false ) {
			$year = date( 'Y' );
			if ( $block_content ) {
				$block_content = preg_replace( '/<time.*<\/time>/', sprintf( '<time datetime="%s">%s</time>', $year, $year ),  $block_content );
			} else {
				$block_content = $year;
			}
		}
	}
    
    return $block_content;

}