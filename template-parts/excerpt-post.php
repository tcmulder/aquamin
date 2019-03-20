<?php
/**
 * Template part for displaying post excerpts
 *
 * @package Aquamin
 */

?>

<archive class="excerpt">
	<h2 class="excerpt__title">
		<a href="<?php the_permalink(); ?>">
			<?php the_title(); ?>
		</a>
	</h2>
	<?php the_excerpt(); ?>
</archive>
