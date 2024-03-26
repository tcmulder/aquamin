<?php
/**
 * The footer for your theme
 *
 * @package Aquamin
 */

?>
<footer id="colophon" class="site-footer has-global-padding is-layout-constrained">
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
</footer>