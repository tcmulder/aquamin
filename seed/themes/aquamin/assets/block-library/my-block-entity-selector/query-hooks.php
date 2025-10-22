<?php

/**
 * Define post types
 * 
 * We need to define which post types this should apply to, since
 * rest rest_{$this->post_type}_query needs them defined individually.
 * Feel free to add your own custom post types.
 */
function aquamin_query_post_allowed_post_types() {
	return array( 'post' );
}

/**
 * Parse query and maybe add custom options
 *
 * @param array $args Array query details
 * @param array $args['query'] The original query
 * @param array $args['include'] Posts to include as post__in
 * @param array $args['exclude'] Posts to exclude as post__not_in
 * @return array Parsed query
 */
function aquamin_parse_query( $args ) {

	// bail if we have no customizations to apply
	$query = $args['query'];
	if ( empty( $args['include'] ) ) {
		return $query;
	}

	// replace our entire query with the IDs we get (otherwise the query will try to re-filter by taxonomy etc.)
	$query = array(
		'post__in' => $args['include'],
		'post_type' => $query['post_type'] ?? 'post',
		'orderby' => 'post__in',
		'posts_per_page' => ! empty( $args['include'] ) ? count( $args['include'] ) : 1,
	);

	// send it!
	return $query;
}

/**
 * Front-end post setup
 * 
 * Grab the appropriate post on the front-end of the site by modifying query vars.
 */
add_filter( 'query_loop_block_query_vars', 'aquamin_query_post_modify_vars', 10, 2 );
function aquamin_query_post_modify_vars( $query, $block ) {
	
	// ignore if the query block is not using an allowed post type
    if ( ! in_array( $query['post_type'], aquamin_query_post_allowed_post_types() ) ) {
        return $query;
    }

	// parse our customizations into the query
	$query = aquamin_parse_query( array(
		'query'    => $query,
		'include'  => $block->context['query']['aquaminPostIn'] ?? array(),
	) );

	// send it!
    return $query;
}

/**
 * Back-end post setup
 * 
 * Grab the appropriate post on the back-end of the site via the REST API.
 */
function aquamin_query_post_modify_rest( $args, $request ) {

	// NOTE: unlike front-end post setup we needn't check post type because we're calling rest_POST-TYPE_query anyway

	// parse our customizations into the query
	$args = aquamin_parse_query( array(
		'query'    => $args,
		'include'  => $request['aquaminPostIn'] ?? array(),
	) );

	// send it!
	return $args;
}

// call the above function on all allowed post types
foreach( aquamin_query_post_allowed_post_types() as $post_type ) {
	add_filter('rest_' . $post_type . '_query', 'aquamin_query_post_modify_rest', 10, 2);
}
