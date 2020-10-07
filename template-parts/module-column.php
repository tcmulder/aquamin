<?php

	// get image size variables
	$image_sizes = aquamin_inner_images();

	// prep to store classes
	$classes = '';

	// determine how many there are
	$group_count = count( get_sub_field( 'repeater' ) );
	$classes .= 'col--' . ( 4 > $group_count ? $group_count : 'grid' );

	// special styling classes
	$special_styling = get_sub_field( 'styling' );
	$classes .= ( $special_styling ? ' ' . implode( ' ', $special_styling ) : '' );

	// determine container width
	$full_width = ( is_array( $special_styling ) && in_array( 'col--full-width', $special_styling ) ? true : false );

?>
<section <?php aquamin_module_class( 'col ' . $classes ); ?>>
	<?php echo ( $full_width ? '' : '<div class="col__inner mod--inner">' ); ?>
		<?php if( have_rows( 'repeater' ) ) : ?>
			<?php while( have_rows( 'repeater' ) ) : the_row(); $i = get_row_index() - 1; ?>
				<?php
					// establish widths/spacing
					$style = '';
					$width = get_sub_field( 'width' );
					if ( $width ) {
						$width = ( 30 == $width ? 33.3333 : (float) $width ); // usually
						$width = ( 70 == $width ? 66.6667 : (float) $width ); // usually
						$style = ' style="--width:' . $width . '%"';
					} else {
						if ( 1 === $group_count ) {
							$width = 100;
						} elseif ( 2 === $group_count ) {
							$width = 50;
						} elseif ( 3 === $group_count ) {
							$width = 33.3333;
						} else { // 4 =< $group_count
							$width = 25;
						}
					}

					// establish image sizes
					$image_sizes[ 'css_bp_desktop' ] = ( ! $full_width ? $image_sizes[ 'css_bp_desktop' ] : $image_sizes[ 'max_width' ] );
					$split = $width / 100;
					$image_desktop = round( ( $image_sizes[ 'css_bp_desktop' ] * $split ) - ( $image_sizes[ 'css_padding_desktop' ] * 2 ) );
					$split = 0.5; // for mobile
					$split = ( 3 === $group_count ? 0.333333 : $split );
					$split = ( 1 === $group_count ? 0.75 : $split ); // not full width (too large) though column is
					$image_tablet = round( ( $image_sizes[ 'css_bp_tablet' ] * $split ) - ( $image_sizes[ 'css_padding_tablet' ] * 2 ) );
					$split = ( 3 === $group_count ? 0.5 : 1 ); // usually 0.5: not full width (too large) though column is
					$image_phone = round( ( $image_sizes[ 'css_bp_phone' ] * $split ) - ( $image_sizes[ 'css_padding_phone' ] * 2 ) );
					// get the content
					$content = aquamin_acf_build_modules(
						aquamin_id(),
						array(
							// field group info
							'field_name' =>'elements',
							'template_name' =>'element',
							// options for image element
							'image' => array(
								'type' => 'srcset',
								'default'   => array(
								    'width'  => $image_desktop,
								    'height' => 9999,
								    'crop'   => false,
								),
								'images' => array(
								    array(
								        'max-width' => $image_sizes[ 'css_bp_phone' ],
								        'width'     => $image_phone,
								        'crop'      => false,
								    ),
								    array(
								        'max-width' => $image_sizes[ 'css_bp_tablet' ],
								        'width'     => $image_tablet,
								        'crop'      => false,
								    ),
								    array(
								        'min-width' => $image_sizes[ 'css_bp_tablet' ] + 1,
								        'width'     => $image_desktop,
								        'crop'      => false,
								    ),
								),
							),
						)
					);
				?>
				<?php if ( $content ) : ?>
					<div class="col__group"<?php echo $style; ?>>
						<?php echo $content; ?>
					</div>
				<?php else :  ?>
					<div class="col__group col__group--spacer"<?php echo $style; ?>><!-- spacer --></div>
				<?php endif; ?>
			<?php endwhile; ?>
		<?php endif; ?>
	<?php echo ( $full_width ? '' : '</div>' ); ?>
</section>
