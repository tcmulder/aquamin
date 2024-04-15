<?php
/**
 * The template for displaying the site's sidebar
 * 
 * This file renders the component's HTML via:
 * get_template_part( 'dist/component-library/blog/sidebar-view' );
 *
 * @package Aquamin
 */
?>

<aside id="secondary" class="main-sidebar has-global-padding">
	<h3><?php _e( 'Archives', 'aquamin' ); ?></h3>
	<ul>
		<?php wp_get_archives('type=monthly'); ?>
	</ul>
	<h3><?php _e( 'Categories', 'aquamin' ); ?></h3>
	<ul>
		<?php wp_list_categories('title_li='); ?>
	</ul>
</aside>
