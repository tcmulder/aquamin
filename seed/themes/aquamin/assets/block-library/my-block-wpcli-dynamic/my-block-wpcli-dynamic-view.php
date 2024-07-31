<?php
/**
 * My My Block WP-CLI Dynamic dynamic block PHP.
 *
 * This file renders the dynamic block.
 * 
 * @param  array $attributes  Block attributes.
 * @param  array $content     Block content.
 * @param  array $block       Block instance.
 * @return string
 */
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'my-block-wpcli-dynamic' ) ) ?>>
	<!-- START: replace with your own code -->
	<?php echo $content !== '' ? $content : 'The My Block WP-CLI Dynamic block.'; ?>
	<!-- END: replace with your own code -->
</div>
