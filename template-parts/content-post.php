<?php
/**
 * Template part for displaying page content in single.php for posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aquamin
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-content torso' ); ?>>
	<h1 class="post-content__title"><?php the_title(); ?></h1>
	<?php the_content(); ?>
</article>
