<?php
/**
 * The template-title component PHP.
 *
 * This file renders the component's HTML
 * via the template part path:
 * 
 * get_template_part( 'components/component-library/template-slug/template-slug-markup' );
 * 
 * @param  array 	$args 	Optional array of custom arguments from parent script
 * @return string
 */
?>
<?php printf( '<b>%s args: %s</b>', __( 'template-title', 'aquamin' ), print_r( $args, 1 ) ); ?>
