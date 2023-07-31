<?php
/**
 * The template-title component PHP.
 *
 * This file renders the component's HTML
 * via the template part path:
 * 
 * get_template_part( 'assets/component-library/template-slug/template-slug-markup' );
 * 
 * @param  array 	$args 	Optional array of custom arguments from parent script
 * @return string
 */
?>
<?php printf( '<div class="my-component"><b>%s args: %s</b></div>', __( 'My Component', 'aquamin' ), print_r( $args, 1 ) ); ?>
