<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package Aquamin
 */

get_header(); ?>

	<main id="main" class="main-torso">
		<?php if ( isset( $_GET['s'] ) && $_GET['s'] == '' ) : ?>
			<?php _e( 'Please provide a search term', 'aquamin' ) ?>
		<?php elseif ( have_posts() ) : ?>
			<div class="main-torso__content inner">
				<h1 class="main-torso__title">
					<?php printf( esc_html__( 'Search Results for: %s', 'aquamin' ), '<span>' . get_search_query() . '</span>' ); ?>
				</h1>
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'template-parts/content', 'search' ); ?>
				<?php endwhile; ?>
			</div>
		<?php else : ?>
			<div class="main-torso__content inner">
				<?php get_template_part( 'template-parts/content', 'none' ); ?>
			</div>
		<?php endif; ?>
	</main>

<?php get_footer();