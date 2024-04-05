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

get_template_part( 'dist/component-library/header/header-view' ); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<?php if ( have_posts() ) : ?>
				<?php while ( have_posts() ) : the_post(); ?>
					<section class="torso has-global-padding is-layout-constrained">
						<?php the_content(); ?>
					</section>
				<?php endwhile; ?>
			<?php else : ?>
				<?php 
					get_template_part(
						'dist/component-library/no-content/no-content-view',
						null,
						array(
							'message' => __( 'Sorry, the template you requested isn\'t available' ),
						)
					);
				?>
			<?php endif; ?>
		</main>
	</div>

<?php get_template_part( 'dist/component-library/footer/footer-view' );
