<?php
/**
 * The main site navigation menu
 * 
 * This file renders the component's HTML via:
 * get_template_part( 'dist/component-library/menu/menu-view' );
 *
 * @package Aquamin
 */
?>

<div class="site-menu">
	<?php
		wp_nav_menu( array(
			'menu_id' => 'site-navigation',
			'menu_class' => 'site-menu__nav',
			'container'       => 'nav',
			'theme_location'  => 'head-menu',
		) );
	?>
</div>
