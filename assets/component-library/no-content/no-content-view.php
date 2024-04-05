<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * This file renders the component's HTML via:
 * get_template_part( 'dist/component-library/no-content/no-content-view' );
 * 
 * @package Aquamin
 * @param  array  $args  Arguments passed in from get_template_part() call.
 */
?>

<article class="not-found has-global-padding is-layout-constrained">
	<?php echo $args['message'] ?? __( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'aquamin' ); ?>
</article>
