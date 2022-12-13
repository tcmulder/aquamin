<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
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
					<?php get_template_part( 'components/component-library/content/content', 'page' ); ?>
				<?php endwhile; ?>
			<?php else : ?>
				<section class="torso">
					<?php get_template_part( 'components/component-library/content/content', 'none' ); ?>
				</section>
			<?php endif; ?>
		</main>
	</div>

<?php get_footer();
