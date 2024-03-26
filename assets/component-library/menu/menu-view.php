<?php
/**
 * The main site navigation menu
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
