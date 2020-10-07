<?php
    /**
     * The template part for displaying the image nested element.
     */
?>
<?php
	$image = '';
	$image_id = ( $opt && $opt[ 'image' ][ 'default' ][ 'id' ] ? $opt[ 'image' ][ 'default' ][ 'id' ] : get_sub_field( 'image' ) );
	$image_arr = wp_get_attachment_image_src( $image_id, 'full' );
	$image_src = $image_arr[ 0 ];
	$image_width = $image_arr[ 1 ];
	$image_height = $image_arr[ 2 ];
	$image_mime = wp_check_filetype( $image_src );
	$image_resize = get_sub_field( 'size' );

	// if we're to use the full size
	if ( 'full' === $image_resize || 'image/svg+xml' === $image_mime[ 'type' ] || ! $opt || ! $opt[ 'image' ] ) {
		// if srcset doesn't make sense for this filetype
		if ( 'image/svg+xml' === $image_mime[ 'type' ] || 'image/gif' === $image_mime[ 'type' ] ) {
			$image_alt = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
			$image .= '<img';
				$image .= ' class="image-element"';
				$image .= ' src="' . $image_src . '"';
				$image .= ( $image_width ? ' width="' . $image_width . '"' : '' );
				$image .= ( $image_height ? ' height="' . $image_height . '"' : '' );
				$image .= ' alt="' . $image_alt . '"';
			$image .= ' />';
		// if we can gain performance by using srcset
		} else {
			$image_srcset = wp_get_attachment_image_srcset( $image_id, 'full' );
			$image_sizes = wp_get_attachment_image_sizes( $image_id, 'full' );
			$image_alt = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
			$image .= '<img';
				$image .= ' class="image-element"';
				$image .= ' srcset="' . $image_srcset . '"';
				$image .= ' src="' . $image_src . '"';
				$image .= ' sizes="' . $image_sizes . '"';
				$image .= ( $image_width ? ' width="' . $image_width . '"' : '' );
				$image .= ( $image_height ? ' height="' . $image_height . '"' : '' );
				$image .= ' alt="' . $image_alt . '"';
			$image .= ' />';
		}
	// if we're to resize the image
	} else { // 'resize' === $image_resize
		// use the options passed into this element (so modules can have custom options)
		$image_attr = ( $opt && $opt[ 'image' ] ? $opt[ 'image' ] : null );
		if ( is_array( $image_attr[ 'images' ] ) ) {
			$count = count( $image_attr[ 'images' ] );
			for ( $i = 0; $i < $count; $i++ ) {
				$image_attr[ 'images' ][ $i ][ 'id' ] = $image_id;
			}
		}
		$image_attr[ 'default' ][ 'id' ] = $image_id;
		$image_attr[ 'attr' ] = array(
		    'class' => 'image-element',
		);
		$image = aquamin_img( $image_attr );
	}

	echo $image;

?>
