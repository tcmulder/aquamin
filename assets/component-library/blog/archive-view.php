<?php
/**
 * The template for displaying archive pages
 * 
 * This file renders the component's HTML via:
 * get_template_part( 'dist/component-library/blog/archive-view' );
 *
 * @package Aquamin
 */

get_template_part( 'dist/component-library/header/header-view' ); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<section class="torso has-global-padding is-layout-constrained">
			<?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
			<?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
			<?php if ( have_posts() ) : ?>
				<?php while( have_posts() ) : the_post(); ?>
					<article class="excerpt">
						<h2 class="excerpt__title">
							<a href="<?php the_permalink(); ?>">
								<?php the_title(); ?>
							</a>
						</h2>
						<?php the_excerpt(); ?>
					</article>
				<?php endwhile; ?>
				<?php aquamin_pagination(); ?>
			<?php else : ?>
				<?php get_template_part( 'dist/component-library/no-content/no-content-view' ); ?>
			<?php endif; ?>
		</section>
		<?php get_template_part( 'dist/component-library/blog/sidebar-view' ); ?>
	</main>
</div>

<?php get_template_part( 'dist/component-library/footer/footer-view' );