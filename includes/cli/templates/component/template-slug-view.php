<?php
/**
 * The template-title component
 *
 * This file renders the component's HTML via:
 * get_template_part( 'assets/component-library/_template-component/template-slug-view' );
 * 
 * @package Aquamin
 * @param   array  $args  Optional array of custom arguments from parent script
 */
/* TEMPLATE: enqueue component script */
/* TEMPLATE: enqueue component style */
?>
<?php printf( '<div class="template-slug"><b>%s args: %s</b></div>', __( 'template-title', 'aquamin' ), print_r( $args, 1 ) ); ?>
