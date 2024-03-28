<?php
/**
 * The template for displaying search results pages
 * 
 * This file renders the component's HTML via:
 * get_template_part( 'assets/component-library/search/search-view' );
 *
 * @package Aquamin
 */

get_template_part( 'assets/component-library/header/header-view' ); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<section class="search-results torso has-global-padding is-layout-constrained">
			<?php if ( isset( $_GET['s'] ) && $_GET['s'] == '' ) : ?>
				<?php _e( 'Please provide a search term', 'aquamin' ) ?>
			<?php else : ?>
				<h1 class="search-results__title">
					<?php printf( esc_html__( 'Search Results for: %s', 'aquamin' ), '<em>' . get_search_query() . '</em>' ); ?>
				</h1>
				<?php if ( have_posts() ) : ?>
					<?php while ( have_posts() ) : the_post(); ?>
						<article id="post-<?php the_ID(); ?>" <?php post_class( 'search-result entry-content' ); ?>>
							<h2 class="search-result__title">
								<a href="<?php the_permalink(); ?>">
									<?php the_title(); ?>
								</a>
							</h2>
							<div class="search-result__excerpt">
								<?php the_excerpt(); ?>
							</div>
						</article>
					<?php endwhile; ?>
					<?php aquamin_pagination(); ?>
				<?php else : ?>
					<?php
						get_template_part(
							'assets/component-library/no-content/no-content-view',
							null,
							array(
								'message' => __( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'aquamin' )
							)
						);
					?>
				<?php endif; ?>
			<?php endif; ?>
		</section>
	</main>
</div>

<?php get_template_part( 'assets/component-library/footer/footer-view' );