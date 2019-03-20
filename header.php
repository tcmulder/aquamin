<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Aquamin
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="all-the-things">

	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'aquamin' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="site-header__nav inner">
			<?php
			    wp_nav_menu( array(
					'container_id'    => 'site-navigation',
					'theme_location'  => 'head-menu',
					'container'       => 'nav',
					'container_class' => 'header-nav',
				) );
			?>
		</div>
	</header>

	<div id="content" class="site-content">
