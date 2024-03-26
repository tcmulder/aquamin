<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Aquamin
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<section class="torso has-global-padding is-layout-constrained">
			<?php 
				$the_id = 0;
				if ( $post = get_page_by_path( '404-page', OBJECT, 'page' ) ) {
					$the_id = $post->ID;
				}
			?>
			<?php if ( $the_id ) : ?>
				<?php echo apply_filters( 'the_content', get_post_field( 'post_content', $the_id ) ); ?>
			<?php else : ?>
				<h1 class="page-title"><?php esc_html_e( '404 Not Found', 'aquamin' ); ?></h1>
				<p><?php esc_html_e( 'Sorry, the page you requested doesn&rsquo;t exist.', 'aquamin' ); ?></p>
			<?php endif; ?>
		</section>
	</main>
</div>

<?php get_footer();