<?php
/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aquamin
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'search-result' ); ?>>
	<div class="search-result__inner inner">
		<h2 class="search-result__title">
			<a href="<?php the_permalink(); ?>">
				<?php the_title(); ?>
			</a>
		</h2>
		<div class="search-result__excerpt">
			<?php the_excerpt(); ?>
		</div>
	</div>
</article>
