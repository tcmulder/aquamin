<?php
/**
 * Library of common aquamin utility functions
 * 
 * @package Aquamin
 */

 /**
 * Easy conditional print.
 *
 * Like printf/sprintf but only outputs the string (usually
 * HTML) if none of the values are false.
 * 
 * Example:
 * 
 * $heading = single_cat_title(); // this will be false on e.g. page.php
 * $blurb = "Some text.";
 * // echo nothing (printf would output <h1></h1><p>Some text.</p> with empty H1)
 * if_printf( '<h1>%s</h1><p>%s</p>', $heading, $blurb );
 * 
 * @param  string  $sprintf   String for sprintf to parse.
 * @param  mixed   ...$items  Arguments sprintf will use.
 * @return string  Either sprintf result or an empty string.
 */
function if_sprintf( $sprintf, ...$items ) {
	
	// get the first value and continue if it exists
	$first = array_shift( $items );
	if ( aquamin_is_truty_or_zero( $first ) ) {
		// simply return it if that's all we've got (90% of the time it's just one argument)
		if ( ! $items ) {
			return sprintf( $sprintf, $first );
		} else {
			// if any remaining items don't exist then return an empty string
			foreach ( $items as $item ) {
				if ( ! aquamin_is_truty_or_zero( $item ) ) {
					return '';
				}
			}
			// return the sprintf result if all items exist
			return call_user_func_array( 'sprintf', array_merge( (array) $sprintf, (array) $first, $items ) );
		}
	}

}

// echo rather than return string
function if_printf( $sprintf, ...$item ) {
	echo if_sprintf( $sprintf, ...$item );
}

// check truthy but allow 0, '0', 0.0, etc.
function aquamin_is_truty_or_zero( $mixed ) {
	return ( !! $mixed || is_int( $mixed ) || is_float( $mixed ) || '0' === $mixed );
}

/**
 * Get disambiguated number (e.g. for unique IDs)
 * 
 * @return  string  Unique number.
 */
function aquamin_disambiguate() {
	
	// set an unique increment variable if it's not already set
	if ( ! isset( $GLOBALS[ 'disambiguation_incrament' ] ) ) {
		$GLOBALS[ 'disambiguation_incrament' ] = 0;
	}
	// store the unique number after incrementing
	$unique_number = ++$GLOBALS[ 'disambiguation_incrament' ];

	// return it
	return $unique_number;

}

/**
 * Add pagination.
 *
 * Use following a loop displaying posts that may contain pagination.
 *
 * @param  string $class Optional          Class to add to the wrapper.
 * @param  string $prev_text Optional      Text to show for previous button (default "Previous").
 * @param  string $next_text Optional      Text to show for next button (default "Next").
 * @param  string $show_disabled Optional  Show disabled prev/next buttons (default is false).
 * @param  string $echo Optional           Echo the output rather than simply return it.
 * @return string                          Pagination HTML.
 */
function aquamin_pagination( $class = 'pagination', $prev_text = '', $next_text = '', $show_disabled = false, $echo = true ) {
	
	global $wp_query;
	$pagination = '';
	$big = 999999999;
	$prev_text = ( '' !== $prev_text ? $prev_text : __( 'Previous', 'aquamin' ) );
	$next_text = ( '' !== $next_text ? $next_text : __( 'Next', 'aquamin' ) );
	$nav = paginate_links( array(
	    'base'      => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
	    'format'    => '?paged=%#%',
	    'prev_text' => $prev_text,
	    'current'   => max( 1, get_query_var( 'paged' ) ),
	    'total'     => $wp_query->max_num_pages,
	    'next_text' => $next_text,
	) );
	
	if ( $nav ) {
		$html = $nav;
		if ( $show_disabled ) {
			if ( stripos( $html, 'prev page-numbers' ) === false ) {
				$html = ' <a href="javascript:void(0)" aria-disabled="true" class="prev page-numbers">' . $prev_text . '</a> ' . $html;
			}
			if ( stripos( $html, 'next page-numbers' ) === false ) {
				$html = $html . ' <a href="javascript:void(0)" aria-disabled="true" class="next page-numbers">' . $next_text . '</a> ';
			}
		}
		$pagination = '<div class="' . $class . '">' . $html . '</div>';
	}

	if ( $echo ) {
		echo $pagination;
	}
	
	return $pagination;

}

/**
 * Get a specific post's content
 * 
 * Allows us to get the content of one post from within another. Defaults
 * to getting Appearance > Global Content posts and their content if you
 * just pass in array( 'name' => 'global-content-slug' ).
 * 
 * @param  array   $query  Query for a single post to grab content
 * @return string          Post content or empty string
 */
function aquamin_get_post_content( $query ) {
	
	// start by assuming no content
	$the_content = '';

	// merge query with ours to get the ID of a single matching post
	$query = wp_parse_args( $query, array(
		'post_type' => 'aquamin-general',
		'posts_per_page' => 1,
		'fields' => 'ids'
	) );
	
	// get the content of the post if it exists
	$posts = get_posts( $query );
	if( $posts ) {
		$the_content = apply_filters( 'the_content', get_post_field( 'post_content', $posts[0] ) );
	}
	
	// send it!
	return $the_content;

}

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

	$the_id = $GLOBALS[ 'aquamin_current_id' ] ?? null;

	if ( ! $the_id ) {

		// start with a default
		$the_id = get_the_id();

		// use page set as the "posts page" for blog-like templates
		if ( get_option( 'page_for_posts' )
			&& ( is_singular( 'post' )
				|| is_category()
				|| is_tag()
				|| is_home()
				|| ( is_archive() && 'post' === get_post_type() )
			)
		) {
			$the_id = get_option( 'page_for_posts' );
		// use a page with slug "404-page" for the 404 page id
		} elseif ( is_404() ) {
			if ( $post = get_page_by_path( '404-page', OBJECT, 'page' ) ) {
				$the_id = $post->ID;
			}
		}

		$GLOBALS[ 'aquamin_current_id' ] = $the_id;

	}

	return $the_id;
}
