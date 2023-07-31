<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aquamin
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'torso entry-content has-global-padding is-layout-constrained' ); ?>>
	<?php the_content(); ?>
</article>
