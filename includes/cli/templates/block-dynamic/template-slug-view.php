<?php
/**
 * My template-title dynamic block PHP.
 *
 * This file renders the dynamic block.
 * 
 * @param  array $attributes  All block attributes.
 * @param  array $content     Block content.
 * @param  array $block       Block instance.
 * @return string             HTML output.
 */
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'template-slug' ) ) ?>>
	<!-- START: replace with your own code -->
	<?php echo $content !== '' ? $content : 'template-desc'; ?>
	<!-- END: replace with your own code -->
</div>
