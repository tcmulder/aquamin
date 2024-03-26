<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @package Aquamin
 * 
 * @param  array  $args  Arguments passed in from get_template_part() call.
 */
?>
<article class="not-found has-global-padding is-layout-constrained">
	<?php echo $args['message'] ?? __( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'aquamin' ); ?>
</article>
