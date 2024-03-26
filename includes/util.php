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
 * Break file cache by appending `?ver={timestamp}` to the URL.
 * 
 * Note: if you'd rather manually break cache, just
 * replace the return line with e.g. `return '1.0.0'`.
 * 
 * @param  string  $path  File URI.
 * @return string         File URI with cache break appended.
 */
function aquamin_cache_break(  $path )  {
	return file_exists( $path ) ? @filemtime( $path ) : 1;
}

/**
 * Setup general content (like footers)
 */
add_action( 'after_setup_theme', 'aquamin_general_custom_post_type' );
function aquamin_general_custom_post_type() {
	register_post_type(
		'aquamin-general',
		array(
			'labels' => array(
				'name' => _x( 'Global Content', 'Taxonomy General Name', 'aquamin' ),
				'singular_name' => _x( 'Global Content', 'Taxonopmy Singular Name', 'aquamin' ),
				'menu_name' => __( 'Global Content', 'aquamin' ),
				'all_items' => __( 'Global Content', 'aquamin' ),
				'parent_item' => __( 'Parent Global Content', 'aquamin' ),
				'parent_item_colon' => __( 'Parent Global Content:', 'aquamin' ),
				'new_item_name' => __( 'New Global Content Name', 'aquamin' ),
				'add_new_item' => __( 'Add New Global Content', 'aquamin' ),
				'edit_item' => __( 'Edit Global Content', 'aquamin' ),
				'update_item' => __( 'Update Global Content', 'aquamin' ),
				'separate_items_with_commas' => __( 'Separate Global Content with commas', 'aquamin' ),
				'search_items' => __( 'Search Global Content', 'aquamin' ),
				'add_or_remove_items' => __( 'Add or remove items', 'aquamin' ),
				'choose_from_most_used' => __( 'Choose from the most used items', 'aquamin' ),
				'not_found' => __( 'Not Found', 'aquamin' ),
			),
			'public' => false,
			'show_in_rest' => true,
			'show_in_menu' => 'themes.php',
			'show_in_nav_menus' => true,
			'show_ui' => true,
			'menu_position' => 20,
			'menu_icon' => 'dashicons-button',
			'supports' => array(
				'editor',
				'custom-fields',
				'title',
				'thumbnail',
			),
		)
	);
}

/**
 * Get disambiguated number (e.g. for unique IDs)
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
 * Add custom scripts
 * 
 * Adds fields for adding custom embed scripts at
 * ...</head>, <body>..., and/or ...</body>. Options
 * page available under Settings > Custom Scripts.
 * 
 * Supports shortcodes, so you could create a shortcode
 * for excluding a specific post type, list of page
 * IDS, etc. if necessary.
 */

// create the settings page
add_action( 'admin_menu', 'aquamin_create_custom_scripts_options_page' );
function aquamin_create_custom_scripts_options_page() {
	add_options_page( __( 'Custom Scripts', 'aquamin' ), __( 'Custom Scripts', 'aquamin' ), 'administrator', __FILE__, function() {
		ob_start();
			settings_fields('aquamin_custom_scripts');
		$fields = ob_get_clean();
		ob_start();
			do_settings_sections(__FILE__);
		$section = ob_get_clean();
		printf(
			'<form method="post" action="options.php" enctype="multipart/form-data">
				%s%s
				<input name="Submit" type="submit" class="button-primary" value="%s" />
			</form>',
			$fields,
			$section,
			__( 'Save Changes', 'aquamin' )
		);
	});
}

// register custom script fields
add_action( 'admin_init', 'aquamin_register_custom_scripts_fields' );
function aquamin_register_custom_scripts_fields() {
	register_setting( 'aquamin_custom_scripts', 'aquamin_custom_scripts', null ) ;
	add_settings_section('main_section', 'Custom Scripts', function() {
		printf( '<p>%s</p>', __( 'Embed scripts on the front-end of the website.', 'aquamin' ) );
		printf( '<div class="update-nag notice notice-warning inline">%s</div>', __( 'WARNING: be very carful changing these settings, or you could break your site.', 'aquamin' ) );
	}, __FILE__);
	add_settings_field( 'aquamin_custom_scripts_closing_header', 'Before closing &lt;/head&gt;', function() {
		$options = get_option( 'aquamin_custom_scripts' );
		$code = $options['aquamin_custom_scripts_closing_header'] ?? '';
		echo '<textarea name="aquamin_custom_scripts[aquamin_custom_scripts_closing_header]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
	}, __FILE__, 'main_section');
	add_settings_field( 'aquamin_custom_scripts_opening_body', 'Before opening &lt;body&gt;', function() {
		$options = get_option( 'aquamin_custom_scripts' );
		$code = $options['aquamin_custom_scripts_opening_body'] ?? '';
		echo '<textarea name="aquamin_custom_scripts[aquamin_custom_scripts_opening_body]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
	}, __FILE__, 'main_section');
	add_settings_field( 'aquamin_custom_scripts_closing_body', 'Before closing &lt;/body&gt;', function() {
		$options = get_option( 'aquamin_custom_scripts' );
		$code = $options['aquamin_custom_scripts_closing_body'] ?? '';
		echo '<textarea name="aquamin_custom_scripts[aquamin_custom_scripts_closing_body]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
	}, __FILE__, 'main_section');
}

// add code to appropriate places in theme
add_action( 'wp_head', function() {
	$options = get_option( 'aquamin_custom_scripts' );
	echo do_shortcode( $options['aquamin_custom_scripts_closing_header'] ?? '' );
}, 99 );
add_action( 'wp_body_open', function() {
	$options = get_option( 'aquamin_custom_scripts' );
	echo do_shortcode( $options['aquamin_custom_scripts_opening_body'] ?? '' );
}, 99 );
add_action( 'wp_footer', function() {
	$options = get_option( 'aquamin_custom_scripts' );
	echo do_shortcode( $options['aquamin_custom_scripts_closing_body'] ?? '' );
}, 99 );

/**
 * Add pagination.
 *
 * Use following a loop displaying posts that may contain pagination.
 *
 * @param  string $class Optional. Class to add to the wrapper.
 * @param  string $prev_text Optional. Text to show for previous button (default "Previous").
 * @param  string $next_text Optional. Text to show for next button (default "Next").
 * @param  string $show_disabled Optional. Show disabled prev/next buttons (default is false).
 */
function aquamin_pagination( $class = 'pagination', $prev_text = '', $next_text = '', $show_disabled = false ) {
	global $wp_query;
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
		echo '<div class="' . $class . '">' . $html . '</div>';
	}
}

/**
 * Add ani to dynamic blocks
 */
add_filter( 'render_block', 'aqua_dynamic_ani', 10, 2 );
function aqua_dynamic_ani( $block_content, $block ) {

	// start with no custom class names
	$classes = '';

	// handle animation classes
	if ( ! empty( $block[ 'attrs' ][ 'aquaminClassNameAni' ] ) ) {
		$classes .= ' ani ' . implode( ' ',  array_map( function( $ani ) {
			return $ani[ 'value' ];
		}, $block[ 'attrs' ][ 'aquaminClassNameAni' ] ) );
	}

	// handle hide/show responsiveness
	if ( ! empty( $block[ 'attrs' ][ 'aquaminClassNameHide' ] ) ) {
		$classes .= ' ' . implode( ' ',  array_map( function( $ani ) {
			return $ani[ 'value' ];
		}, $block[ 'attrs' ][ 'aquaminClassNameHide' ] ) );
	}

	// if we have new stuff then send it
	if ( $classes && $block_content ) {
		return preg_replace(
			'/' . preg_quote( 'class="', '/' ) . '/',
			'class="' . trim( esc_attr( $classes ) ) . ' ',
			$block_content,
			1
		);
	}
	// just return things unchanged by default
	return $block_content;
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

/**
 * Allow access to current background color var
 *
 * This let's you do things like:
 *	.thing {
 *		border: 1px solid var(--c-bg);
 * 	}
 * So, for .thing.has-0-000-background-color
 * you'll get a black border, and for
 * .thing.has-0-900-background-color you'll
 * get a white border, matching their respective
 * backgrounds. It's often quite useful.
 */
add_action( 'wp_head', 'aquamin_bg_css' );
add_action( 'admin_head', 'aquamin_bg_css' );
function aquamin_bg_css() {
	$colors = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
	if ( $colors ) {
		echo '<style>';
		foreach( $colors as $color ) {
			echo '.has-' . $color[ 'slug' ] . '-background-color { --c-bg: var(--c-' . $color[ 'slug' ] . ') } /* ' . $color[ 'name' ] . " */\n";
		}
		echo '</style>';
	}
}
