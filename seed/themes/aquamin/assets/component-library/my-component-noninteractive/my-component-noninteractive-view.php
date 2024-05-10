<?php
/**
 * The My Component Noninteractive component
 *
 * This file renders the component's HTML via:
 * get_template_part( 'dist/component-library/my-component-noninteractive/my-component-noninteractive-view' );
 * 
 * @package Aquamin
 * @param   array  $args  Optional array of custom arguments from parent script
 */
wp_enqueue_script( 'aquamin-component-my-component-noninteractive-script' );
wp_enqueue_style( 'aquamin-component-my-component-noninteractive-style' );
?>
<article class="torso has-global-padding is-layout-constrained">				
	<div class="wp-block-group has-border-color has-0-0-border-color has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" style="padding-top:var(--wp--preset--spacing--20);padding-right:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20);">
		<?php printf( '<div class="my-component-noninteractive"><b>%s args: %s</b></div>', __( 'My Component Noninteractive', 'aquamin' ), print_r( $args, 1 ) ); ?>
	</div>
</article>
