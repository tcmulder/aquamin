<?php
/**
 * Template part for displaying general posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aquamin
 */

?>
<footer id="colophon" class="site-footer has-global-padding is-layout-constrained">
	<div class="site-footer__inner alignfull">
		<?php
			$footer = get_posts( array(
				'name'				=> 'footer',
				'post_type'			=> 'aquamin-general',
				'posts_per_page'	=> 1,
				'fields'			=> 'ids'
			) );
			if( $footer ) {
				echo apply_filters( 'the_content', get_post_field( 'post_content', $footer[0] ) );
			}
		?>
	</div>
</footer>