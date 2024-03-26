<?php
/**
 * The template for displaying the site's sidebar
 *
 * @package Aquamin
 */
?>

<aside id="secondary" class="main-sidebar">
	<h3><?php _e( 'Archives', 'aquamin' ); ?></h3>
	<ul>
		<?php wp_get_archives('type=monthly'); ?>
	</ul>
	<h3><?php _e( 'Categories', 'aquamin' ); ?></h3>
	<ul>
		<?php wp_list_categories('title_li='); ?>
	</ul>
</aside>
