<?php
/**
 * The main template file
 * 
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It handles the logic of loading the header, torso, and footer for whatever
 * content the site needs to render for a given request.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aquamin
 */

if ( is_singular( 'page' ) ) {
	get_template_part( 'assets/component-library/page/page-render' );
} elseif ( is_singular() ) { // single catchall (for blog use is_singular( 'post' ))
	get_template_part( 'assets/component-library/blog/single-render' );
} elseif ( is_archive() || is_home() ) { // archive catchall
	get_template_part( 'assets/component-library/blog/archive-render' );
} elseif ( is_404() ) {
	get_template_part( 'assets/component-library/404/404-render' );
} elseif ( is_search() ) {
	get_template_part( 'assets/component-library/search/search-render' );
} else {
	get_header();
	get_template_part(
		'assets/component-library/no-content/no-content-render',
		null,
		array(
			'message' => __( 'Sorry, the template you requested isn\'t available' ),
		)
	);
	get_footer();
}
