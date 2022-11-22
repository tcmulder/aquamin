<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Aquamin
 */

?>

	</div><!-- #content (opened in header.php) -->

	<footer id="colophon" class="site-footer">
		<div class="site-footer__nav mod--inner">
			<?php
				$footer = get_posts( array(
					'name' => 'footer',
					'post_type' => 'aquamin-general',
					'posts_per_page' => 1,
				) );
				if( $footer ) {
					echo apply_filters( 'the_content', get_post_field( 'post_content', $footer[0]->ID ) );
				}
			?>
		</div>
	</footer>

</div><!-- #page (opened in header.php) -->

<?php wp_footer(); ?>

</body>
</html>
