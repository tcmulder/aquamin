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
		<div class="site-footer__nav inner">
			<?php
				wp_nav_menu( array(
					'theme_location'  => 'foot-menu',
					'container'       => 'nav',
					'container_class' => 'footer-nav',
				) );
			?>
			</div>
		</div>
		<div class="site-footer__copy inner">
			&copy;<?php echo date( 'Y' ) ?>
		</div>
	</footer>

</div><!-- #page (opened in header.php) -->

<?php wp_footer(); ?>

</body>
</html>
