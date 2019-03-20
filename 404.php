<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Aquamin
 */

get_header(); ?>

	<main id="main" class="main-torso">
		<h1 class="page-title"><?php esc_html_e( '404 Not Found', 'aquamin' ); ?></h1>
		<p><?php esc_html_e( 'Sorry, the page you requested doesn&rsquo;t exist.', 'aquamin' ); ?></p>
	</main>

<?php get_footer();
