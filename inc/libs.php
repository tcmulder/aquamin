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

		// start with a default
		$the_id = get_the_id();

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
		// use a page with slug "404-page" for the 404 page id
		} elseif ( is_404() ) {
			if ( $post = get_page_by_path( '404-page', OBJECT, 'page' ) ) {
				$the_id = $post->ID;
			}
		}

		wp_cache_add( 'aquamin_current_id', $the_id, 'aquamin_ids' );

	}

	return $the_id;
}

/**
 * Create a list of module classes from an array.
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

/**
 * Create a list of element classes from an array.
 *
 * @param  array $class Optional. One or more classes to add to the class attribute, separated by a single space.
 * @param  boolean $echo Optional. Whether or not to echo.
 * @param  boolean $add_attr Optional. Whether or not add class="" wrapper.
 * @return string
 */
function aquamin_el_class ( $class = '', $echo = true, $add_attr = true ) {
	// start with any classes added as arguments (may be empty)
	$html = $class;
	// get any special classes applied to this module
	$acf_class = array();
	if ( $html && $add_attr ) {
		$html = 'class="' . $html . '"';
	}
	if ( $echo ) {
		echo $html;
	}
	return $html;
}

/**
 * Get disambiguated number (e.g. for unique IDs)
 */
function aquamin_disambiguate() {

	// set an unique increment variable if it's not already set
	if(!isset($GLOBALS['disambiguation_incrament'])){
		$GLOBALS['disambiguation_incrament'] = 0;
	}
	// store the unique number after incrementing
	$unique_number = ++$GLOBALS['disambiguation_incrament'];

	// return it
	return $unique_number;
}
/**
 * Adds pagination.
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
	    'current'   => max(1, get_query_var('paged')),
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
 * Add Background Images
 *  Usage:
 *
 *	For responsive background images, use an array containing
 *  breakpoints and image paths. Remember the cascade!
 *
 *  To just add a single, non-responsive image (e.g. an SVG), use a
 *  string instead of an array with just the image path, no breakpoints.
 *
 *  You can also pass in 'pseudo' => ':before' or any other pseudo
 *  selector (:after, :hover, etc.) if you'd like, but it's optional.
 *
 *  Avoid styling the .disambiguate-x classes directly; add another class
 *  and target that (or its pseudo selectors as the case may be).
 *
 *  Example:
 *  <?php
 *      // get the image object
 *      $image_array = get_field( 'background_image' );
 *
 *      // establish the breakpoints/images (and optionally pseudo selector)
 *      $attr = array(
 *          'images' => array(
 *              '(min-width: 801px)' => $image_array[ 'sizes' ][ 'big' ],
 *              '(max-width: 800px)'  => $image_array[ 'sizes' ][ 'smaller' ],
 *          )
 *      );
 *
 *      // execute the function and store the resulting array
 *      $bg_image = aquamin_bg( $attr );
 *  ?>
 *  <div class="hero <?php echo $bg_image[ 'class' ]; ?>">
 *      <?php echo $bg_image['styles']; ?>
 *      <span>You're My Hero!</span>
 *  </div>
 *
 */
function aquamin_bg($attr) {
	// set an unique increment variable if it's not already set
	if(!isset($GLOBALS['disambiguation_incrament'])){
		$GLOBALS['disambiguation_incrament'] = 0;
	}
	// store the unique number after incrementing
	$unique_number = ++$GLOBALS['disambiguation_incrament'];

	// build the styles
	$styles  = '<style>';

		// if this is an array of sizes than set up breakpoints
		if(is_array($attr['images'])){
			// loop through images and insert into respective breakpoints
			foreach($attr['images'] as $bp => $src){
				// disambiguate the selector for multiples per-page
				$selector = '.disambiguate-' . $unique_number . (isset($attr['pseudo']) ? $attr['pseudo'] : '');
				// add the query
				$styles .= "\n@media ". $bp ." {";
					$styles .= "\n\t" . $selector . "{\n\t\tbackground-image:url(\"" . $src . "\");\n\t}\n";
				$styles .= "}";
			}
		// if this is a string
		} else {
			// disambiguate the selector for multiples per-page
			$selector = '.disambiguate-' . $unique_number  . $attr['pseudo'];
			// just set up one image without breakpoints
			$styles .= $selector . "{\n\tbackground-image:url(\"" . $attr['images'] . "\");\n}";
		}
	$styles .= '</style>';

	// set up the return array
	$return_array = array(
		'class' => "disambiguate-$unique_number",
		'styles' => $styles
	);

	// return the styles
	return $return_array;
}

/**
 * Add srcset/picture images
 *
 * Note: requires plugin Fly Dynamic Image Resizer
 *
 * Example:
 *
 *	$image_id = 123;
 *	echo aquamin_img( array(
 *		'type' => 'srcset', // 'srcset' or 'picture'
 *		'default'   => array(
 *			'id'     => $image_id,
 *			'width'  => 1440,
 *			'height' => 810,
 *		),
 *		'images' => array( // ignored if svg/gif mime type
 *			array(
 *				'max-width' => 500,
 *				'width'     => 500,
 *			),
 *			array(
 *				'max-width' => 800,
 *				'width'     => 800,
 *			),
 *			array(
 *				'min-width' => 801,
 *				'width'     => 1440,
 *				// 'id'        => $image_id, // defaults to default image id
 *				// 'height'    => 100, // defaults to default image aspect ratio
 *				// 'crop'      => false, // defaults to true
 *			),
 *		),
 *		'attr' => array(
 *			'class' => 'my-image-class'
 *		)
 *	) );
 */

function aquamin_img( $opt ) {

	// establish attributes (for parent element only)
	$parent_attr = '';
	if ( $opt[ 'attr' ] ) {
		foreach ( $opt[ 'attr' ] as $key => $val ) {
			$parent_attr .= ' ' . $key . '="' . $val . '" ';
		}
	}

	// for srcset images
	if ( 'srcset' === $opt[ 'type' ] ) {

		// get the default image
		$default_src = '';
		$default_alt = 'alt="' . get_post_meta( $opt[ 'default' ][ 'id' ], '_wp_attachment_image_alt', true ) . '" ';
		$default_path = get_attached_file( $opt[ 'default' ][ 'id' ] );
		$default_mime = wp_check_filetype( $default_path );
		$default_single = in_array( $default_mime[ 'type' ], array( 'image/svg+xml', 'image/gif' ) );
		if ( ! $default_single )  {
			$default_arr = fly_get_attachment_image_src(
				$opt[ 'default' ][ 'id' ],
				array( $opt[ 'default' ][ 'width' ], $opt[ 'default' ][ 'height' ] ),
				( isset( $opt[ 'default' ][ 'crop' ] ) ? $opt[ 'default' ][ 'crop' ] : true )
			);
			$default_src = 'src="' . $default_arr[ 'src' ] . '" ';
		} else {
			$default_arr = wp_get_attachment_image_src( $opt[ 'default' ][ 'id' ] );
			$default_src = 'src="' . $default_arr[ 0 ] . '" ';
		}

		// get the attributes
		$srcset = '';
		$sizes = '';
		if ( ! $default_single && ! empty( $opt[ 'images' ] )  ) {
			$srcset = 'srcset="';
			$sizes = 'sizes="';
			$aspect =  $opt[ 'default' ][ 'height' ] / $opt[ 'default' ][ 'width' ];
			foreach ( $opt[ 'images' ] as $image ) {
				$width = $image[ 'width' ];
				$height = round( $image[ 'height' ] ? $image[ 'height' ] : $aspect * $image[ 'width' ] );
				$image_prev = array( 'width' => $width, 'height' => $height );
				$image_arr = fly_get_attachment_image_src(
					( $image[ 'id' ] ? $image[ 'id' ] : $opt[ 'default' ][ 'id' ] ),
					array( $width, $height ),
					( isset( $image[ 'crop' ] ) ? $image[ 'crop' ] : true )
				);
				$srcset .= $image_arr[ 'src' ] . ' ' . $width . 'w,';
				if ( $image[ 'max-width' ] ) {
					$sizes .= '(max-width: ' . $image[ 'max-width' ] . 'px) ' . $image[ 'width' ] . 'px,';
				} elseif ( $image[ 'min-width' ] ) {
					$sizes .= '(min-width: ' . $image[ 'min-width' ] . 'px) ' . $image[ 'width' ] . 'px,';
				}
			}
			$srcset = rtrim( $srcset, ',' ) . '" ';
			$sizes = $sizes . $opt[ 'default' ][ 'width' ] . 'px" ';
		}

		// return the image
		$attr = $parent_attr . $srcset . $sizes . $default_src . $default_alt;
		return '<img ' . $attr . '/>';

	// for picture elements
	} elseif ( 'picture' === $opt[ 'type' ] ) {

		// get the default image
		$default_arr = fly_get_attachment_image_src(
			$opt[ 'default' ][ 'id' ],
			array( $opt[ 'default' ][ 'width' ], $opt[ 'default' ][ 'height' ] ),
			( isset( $opt[ 'default' ][ 'crop' ] ) ? $opt[ 'default' ][ 'crop' ] : true )
		);
		$default_src = 'src="' . $default_arr[ 'src' ] . '" ';
		$default_alt = 'alt="' . get_post_meta( $opt[ 'default' ][ 'id' ], '_wp_attachment_image_alt', true ) . '" ';
		$default_img = '<img ' . $default_src . $default_alt . '/>';

		// build the html
		$sources = '';
		if ( ! empty( $opt[ 'images' ] ) ) {
			foreach ( $opt[ 'images' ] as $image ) {
				$width = $image[ 'width' ];
				$height = $image[ 'height' ];
				$image_arr = fly_get_attachment_image_src(
					( $image[ 'id' ] ? $image[ 'id' ] : $opt[ 'default' ][ 'id' ] ),
					array( $width, $height ),
					( isset( $image[ 'crop' ] ) ? $image[ 'crop' ] : true )
				);
				$sources .= '<source srcset="';
					$sources .= $image_arr[ 'src' ];
				$sources .= '" media="';
				if ( $image[ 'max-width' ] ) {
					$sources .= '(max-width: ' . $image[ 'max-width' ] . 'px) ';
				} elseif ( $image[ 'min-width' ] ) {
					$sources .= '(min-width: ' . $image[ 'min-width' ] . 'px) ';
				}
				$sources .= '">';
			}
		}
		return '<picture' . $parent_attr . '>' . $sources . $default_img . '</picture>';

	}

}

/**
 * Add video
 *
 * Example:
 *
 * 	$image_id = get_sub_field( 'image' );
 * 	$video_id_webm = get_sub_field( 'video_webm' );
 * 	$video_id_mp4 = get_sub_field( 'video_mp4' );
 *	echo aquamin_vid( array(
 *		'attr' => array(
 *			'autoplay' => '',
 *			'loop' => '',
 *			'muted' => '',
 *			'preload' => 'none',
 *			'class' => 'video-media',
 *			// 'data-vid-src' => '', // note: must add js that will play vid on click
 *		),
 *		'video_ids' => array(
 *			$video_id_webm,
 *			$video_id_mp4,
 *		),
 *		'play_button_classes' => 'button--basic vid-play js-vid-play',
 *		'image_id' => $image_id,
 *	) );
 *
 */
function aquamin_vid( $opt ) {

	// prep to store the video's html output
	$html = '';

	// set up the placeholder image
	$image_alt = '';
	$image_arr = '';
	if( $opt[ 'image_id' ] ) {
		$image_alt = $thumb_alt = get_post_meta( $opt[ 'image_id' ], '_wp_attachment_image_alt', true );
		$image_arr = wp_get_attachment_image_src( $opt[ 'image_id' ], 'full' );
	}

	// establish the html attributes for the video
	$attr = '';
	if ( $opt[ 'attr' ] ) {
		foreach( $opt[ 'attr' ] as $key => $value ) {
			if ( '' !== $value ) {
				$attr .= ' ' . $key . '="' . $value . '"';
			} else {
				$attr .= ' ' . $key;
			}
		}
	}

	// add the placeholder image as the video's poster
	if ( $image_arr ) {
		$attr .= ' poster="' . $image_arr[ 0 ] . '"';
	}

	// add a play button if video load will be triggered on click
	if ( $opt[ 'attr' ] && array_key_exists( 'data-vid-click', $opt[ 'attr' ] ) ) {
		$play_button_classes = ( $opt[ 'play_button_classes' ] ? $opt[ 'play_button_classes' ] : 'vid-play' );
		$html .= '<button class="' . $play_button_classes . '">Play Video</button>';
	}

	// set up the html
	$html .= '<video' . $attr . '>';
		foreach( $opt[ 'video_ids' ] as $video_id ) {
			$html .= '<source';
				$html .= ' ' . ( $opt[ 'attr' ] && array_key_exists( 'data-vid-src', $opt[ 'attr' ] ) ? 'data-vid-src' : 'src' ) . '="' . wp_get_attachment_url( $video_id ) . '"';
				$html .= ' type="' . get_post_mime_type( $video_id ) . '"';
			$html .= '/>';
		}
		if ( $image_arr ) {
			$html .= '<img';
				$html .= ' ' . 'src="' . $image_arr[ 0 ] . '"';
					$html .= ' alt="' . $image_alt . '"';
					$html .= ' width="' . $image_arr[ 1 ] . '"';
					$html .= ' height="' . $image_arr[ 2 ] . '"';
				$html .= '/>';
		}
	$html .= '</video>';
	return $html;

}

/**
 * Calculate inner image sizing
 */
function aquamin_inner_images() {
	return array(
		'max_width' 			=> 2000, // usually 2000 (the maximum image width, i.e. if in full width column)
		'css_bp_desktop' 		=> 1310, // usually 1280 + 15 + 15
		'css_bp_tablet' 		=> 800, // usually 800
		'css_bp_phone' 			=> 500, // usually 500
		'css_padding_desktop' 	=> 15, // usually 15
		'css_padding_tablet' 	=> 15, // usually 15
		'css_padding_phone' 	=> 15, // usually 15
	);
}

/**
 * Easy conditional print.
 *
 * Like printf/sprintf but only outputs the string (usually
 * HTML) if none of the values are (boolean) false.
 *
 */
function if_sprintf( $sprintf, ...$fields ) {
	// get the first value and continue if it's not false
	$first = array_shift( $fields );
	if ( false !== $first && '' !== $first ) {
		// simply output it if that's all we've got (90% of the time it's just one argument)
		if ( ! $fields ) {
			return sprintf( $sprintf, $first );
		// do additional digging if there are multiple replacements to be made
		} elseif ( ! in_array( false, $fields, true ) ) {
			return call_user_func_array( 'sprintf', array_merge( (array) $sprintf, (array) $first, $fields ) );
		}
	}
}
function if_printf( $sprintf, ...$field ) {
	echo if_sprintf( $sprintf, ...$field );
}
