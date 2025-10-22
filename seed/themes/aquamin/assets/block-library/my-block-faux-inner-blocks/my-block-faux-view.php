<?php
/**
 * My My Block Faux dynamic block PHP.
 *
 * This file renders the dynamic block.
 * 
 * @param  array $attributes  All block attributes.
 * @param  array $content     Block content.
 * @param  array $block       Block instance.
 * @return string             HTML output.
 */

/**
 * TESTING NOTE: Here's the magic: in the editor we load fauxInnerBlocks but we load the normal $content on the front-end
 */
$content = isset( $attributes['fauxInnerBlocks'] ) ? do_shortcode( do_blocks( $attributes['fauxInnerBlocks'] ) ) : $content;

?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'my-block-faux' ) ) ?>>
	<?php echo $content !== '' ? $content : 'The My Block Faux block...'; ?>
</div>
