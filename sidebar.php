<?php
/**
 * The sidebar.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
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
