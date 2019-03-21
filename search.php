<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package Aquamin
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<?php if ( isset( $_GET['s'] ) && $_GET['s'] == '' ) : ?>
				<?php _e( 'Please provide a search term', 'aquamin' ) ?>
			<?php elseif ( have_posts() ) : ?>
				<section class="site-main__content mod--inner">
					<h1 class="site-main__title">
						<?php printf( esc_html__( 'Search Results for: %s', 'aquamin' ), '<span>' . get_search_query() . '</span>' ); ?>
					</h1>
					<?php while ( have_posts() ) : the_post(); ?>
						<?php get_template_part( 'template-parts/content', 'search' ); ?>
					<?php endwhile; ?>
				</section>
			<?php else : ?>
				<?php get_template_part( 'template-parts/content', 'none' ); ?>
			<?php endif; ?>
		</main>
	</div>

<?php get_footer();