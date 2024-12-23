<?php
/**
 * The template for displaying all single posts
 * 
 * This file renders the component's HTML via:
 * get_template_part( 'dist/component-library/blog/single-view' );
 *
 * @package Aquamin
 */

get_template_part( 'dist/component-library/header/header-view' ); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'torso entry-content has-global-padding is-layout-constrained' ); ?>>
					<h1 class="post-content__title"><?php the_title(); ?></h1>
					<?php the_content(); ?>
				</article>
			<?php endwhile; ?>
			<?php if ( comments_open() || get_comments_number() ) : ?>
				<section class="comments torso has-global-padding is-layout-constrained">
					<?php comments_template(); ?>
				</section>
			<?php endif; ?>
		<?php else : ?>
			<?php get_template_part( 'dist/component-library/no-content/no-content-view' ); ?>
		<?php endif; ?>
		<?php get_template_part( 'dist/component-library/blog/sidebar-view' ); ?>
	</main>
</div>

<?php get_template_part( 'dist/component-library/footer/footer-view' );