<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aquamin
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<section class="torso">
				<?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
				<?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
				<?php if ( have_posts() ) : ?>
					<?php while( have_posts() ) : the_post(); ?>
						<?php get_template_part( 'components/component-library/excerpt/excerpt', get_post_type() ); ?>
					<?php endwhile; ?>
					<?php aquamin_pagination(); ?>
				<?php else : ?>
					<?php get_template_part( 'components/component-library/content/content', 'none' ); ?>
				<?php endif; ?>
			</section>
		</main>
		<?php get_sidebar(); ?>
	</div>

<?php get_footer();
