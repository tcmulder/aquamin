<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @package Aquamin
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'torso entry-content has-global-padding is-layout-constrained' ); ?>>
					<?php the_content(); ?>
				</article>
			<?php endwhile; ?>
		<?php else : ?>
			<?php get_template_part( 'assets/component-library/no-content/no-content-render' ); ?>
		<?php endif; ?>
	</main>
</div>

<?php get_footer();