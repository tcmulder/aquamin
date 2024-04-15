<?php
/**
 * The footer component PHP.
 *
 * This file renders the component's HTML
 * via the template part path:
 * 
 * get_template_part( 'dist/component-library/footer/footer-view' );
 * 
 * @package Aquamin
 */

// load root footer.php file if one is provided
$has_root_template = ! str_contains( locate_template( 'footer.php' ), '/theme-compat/' );
if ( $has_root_template ) : get_footer(); else : do_action( 'get_footer' ); ?>

			</div><!-- #content (opened via header.php) -->

			<footer id="colophon" class="site-footer has-global-padding is-layout-constrained">
				<?php echo aquamin_get_post_content( array( 'name' => 'footer' ) ); ?>
			</footer>

		</div><!-- #page (opened via header.php) -->

		<?php wp_footer(); ?>
	
	</body>

</html>
<?php endif; // ends check for root footer.php file (which takes precedence over this template part) ?>