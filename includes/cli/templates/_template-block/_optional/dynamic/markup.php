<?php
/**
 * template-title dynamic block PHP.
 *
 * This file renders the dynamic block.
 * 
 * @param  array $args 					Arguments from get_template call.
 * @param  array $args[ 'attributes' ]  Block attributes.
 * @param  array $args[ 'content' ]     Block content.
 * @param  array $args[ 'block' ]       Block instance.
 * @return string
 */
?>
<div class="<?php echo $args[ 'attributes' ][ 'className' ] ?? ''; ?>">
	<?php echo $args[ '$content' ] ?? 'Dynamic Block'; ?>
</div>