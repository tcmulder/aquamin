<?php
/**
 * My template-title dynamic block PHP.
 *
 * This file renders the dynamic block.
 * 
 * @param  array $attributes  Block attributes.
 * @param  array $content     Block content.
 * @param  array $block       Block instance.
 * @return string
 */
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'template-slug' ) ) ?>>
	<!-- replace this demo code with your own: -->
	<?php echo $content !== '' ? $content : 'template-desc'; ?>
</div>
