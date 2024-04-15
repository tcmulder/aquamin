<?php
/**
 * The header component PHP.
 *
 * This file renders the component's HTML
 * via the template part path:
 * 
 * get_template_part( 'dist/component-library/header/header-view' );
 * 
 * @package Aquamin
 */

// load root header.php file if one is provided
$has_root_template = ! str_contains( locate_template( 'header.php' ), '/theme-compat/' );
if ( $has_root_template ) : get_header(); else : do_action( 'get_header' ); ?>
<!doctype html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="profile" href="https://gmpg.org/xfn/11">

		<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?>>

		<?php wp_body_open(); ?>

		<div id="page" class="all-the-things"><!-- (closed via footer.php) -->

			<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'aquamin' ); ?></a>

			<header id="masthead" class="site-header">
				<?php get_template_part( 'dist/component-library/menu/menu-view' ); ?>
			</header>

			<div id="content" class="site-content"><!-- (closed via footer.php) -->
<?php endif; // ends check for root header.php file (which takes precedence over this template part) ?>

