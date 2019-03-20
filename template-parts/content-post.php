<?php
/**
 * Template part for displaying page content in single.php for posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aquamin
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'main-torso__content' ); ?>>
	<div class="main-torso__inner inner">
		<h1 class="main-torso__title"><?php the_title(); ?></h1>
		<?php the_content(); ?>
	</div>
</article>
