<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * This file renders the component's HTML via:
 * get_template_part( 'assets/component-library/_template-component/template-slug-view' );
 * 
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 * @package Aquamin
 */

get_template_part( 'assets/component-library/header/header-view' ); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<section class="torso has-global-padding is-layout-constrained">
			<?php 
				$content_for_404 = aquamin_get_post_content( array(
					'name' => '404-page',
					'post_type' => 'page',
				) );
			?>
			<?php if ( $content_for_404 ) : ?>
				<?php echo $content_for_404; ?>
			<?php else : ?>
				<h1 class="page-title"><?php esc_html_e( '404 Not Found', 'aquamin' ); ?></h1>
				<p><?php esc_html_e( 'Sorry, the page you requested doesn&rsquo;t exist.', 'aquamin' ); ?></p>
			<?php endif; ?>
		</section>
	</main>
</div>

<?php get_template_part( 'assets/component-library/footer/footer-view' );