<?php
/**
 * The My Component Interactive component
 *
 * This file renders the component's HTML via:
 * get_template_part( 'dist/component-library/my-component-interactive/my-component-interactive-view' );
 * 
 * @package Aquamin
 * @param   array  $args  Optional array of custom arguments from parent script
 */
wp_enqueue_script_module( 'aquamin-component-my-component-interactive-script' );
wp_enqueue_style( 'aquamin-component-my-component-interactive-style' );
?>
<section
	class="torso has-global-padding is-layout-constrained"
	data-wp-interactive="aquamin-my-component-interactive"
	data-wp-context='{ "isOpen": false }'
>
	<div data-wp-watch="callbacks.logIsOpen" class="wp-block-group has-border-color has-0-0-border-color has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" style="padding-top:var(--wp--preset--spacing--20);padding-right:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20);">
		<?php printf( '<div class="my-component-interactive"><b>%s args: %s</b></div>', __( 'My Component Interactive', 'aquamin' ), print_r( $args, 1 ) ); ?>
		<button
			type="button"
			data-wp-on--click="actions.toggle"
			data-wp-bind--aria-expanded="context.isOpen"
		>
			<?php _e( 'Toggle', 'aquamin' ); ?>
		</button>
		<p data-wp-bind--hidden="!context.isOpen">
			This element is now visible!
		</p>
	</div>
</section>
