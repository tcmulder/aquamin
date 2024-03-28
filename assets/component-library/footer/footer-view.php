<?php
/**
 * The footer component PHP.
 *
 * This file renders the component's HTML
 * via the template part path:
 * 
 * get_template_part( 'assets/component-library/footer/footer-view' );
 * 
 * @package Aquamin
 */

// load root footer.php file if one is provided
$has_root_template = ! str_contains( locate_template( 'footer.php' ), '/theme-compat/' );
if ( $has_root_template ) : get_footer(); else : do_action( 'get_footer' ); ?>

			</div><!-- #content (opened via header.php) -->

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

		</div><!-- #page (opened via header.php) -->

		<?php wp_footer(); ?>
	
	</body>

</html>
<?php endif; // ends check for root footer.php file (which takes precedence over this template part) ?>