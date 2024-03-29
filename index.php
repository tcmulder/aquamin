<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aquamin
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<?php if ( have_posts() ) : ?>
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'assets/component-library/content/content', get_post_type() ); ?>
				<?php endwhile; ?>
			<?php else : ?>
				<?php get_template_part( 'assets/component-library/content/content', 'none' ); ?>
			<?php endif; ?>
		</main>
	</div>

<?php get_footer();
