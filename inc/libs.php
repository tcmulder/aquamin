<?php
/**
 * Library of common Aquamin functions
 */

/**
 * Set page ID to use.
 *
 * Useful, for example, for using the title
 * from a page named Blog for all post archives.
 * You'd just do:
 *     `echo get_the_title( aquamin_id() );`
 * on archive.php, tag.php, etc.
 *
 * @return integer
 */
function aquamin_id() {

	$the_id = wp_cache_get( 'aquamin_current_id', 'aquamin_ids' );

	if ( ! $the_id ) {

		// use page set as the "posts page" for blog-like templates
		if ( get_option( 'page_for_posts' )
			&& ( is_singular('post')
				|| is_post_type_archive( 'post' )
				|| is_category()
				|| is_tag()
				|| is_home()
			)
		) {
			$the_id = get_option('page_for_posts');
		// use a page with slug "404" for the 404 page id
		} elseif ( is_404() ) {
			if ( $post = get_page_by_path( '404', OBJECT, 'page' ) ) {
			    $the_id = $post->ID;
			} else {
				get_the_id();
			}
		// default to the current page id
		} else {
			$the_id = get_the_id();
		}

		wp_cache_add( 'aquamin_current_id', $the_id, 'aquamin_ids' );

	}

	return $the_id;
}

/**
 * Create a list of classes from an array.
 *
 * Similar to post_class() but for use with
 * Aquamin's built-in class settings ACF field.
 * Must be done within the modules flexible
 * content loop.
 *
 * @param  array $class Optional. One or more classes to add to the class attribute, separated by a single space.
 * @param  boolean $echo Optional. Whether or not to echo.
 * @return string
 */
function aquamin_module_class ( $class = '', $echo = true ) {
	// start with any classes added as arguments (may be empty)
	$html = $class;
	// get any special classes applied to this module
	$acf_class = array();
	if ( function_exists( 'get_sub_field' ) ) {
		$acf_mods = get_sub_field( 'class' );
		if ( $acf_mods && ! empty( $acf_mods ) ) {
			$html = ( $html ? $html . ' ' : $html );
			$html .= join( ' ', $acf_mods );
		}
		$acf_spacing = get_sub_field( 'spacing' );
		if ( $acf_spacing && ! empty( $acf_spacing ) ) {
			$html = ( $html ? $html . ' ' : $html );
			$html .= join( ' ', $acf_spacing );
		}
	}
	if ( $html ) {
		$html = 'class="' . $html . '"';
	}
	if ( $echo ) {
		echo $html;
	}
	return $html;
}
