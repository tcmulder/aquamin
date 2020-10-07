<?php
	/**
	 * The template part for displaying the background module.
	 */
?>
<?php
	$classes = 'background';
	$classes .= ( get_sub_field( 'styles' ) ? ' ' . implode( ' ', get_sub_field( 'styles' ) ) : '' );
	$classes_attr = aquamin_module_class( $classes, false );
	$image = '';
	$image_id = get_sub_field( 'image' );
	if ( $image_id ) {
		$image = aquamin_img( array(
			'type' => 'srcset',
			'default'   => array(
				'id'     => $image_id,
				'width'  => 1920,
				'height' => 9999,
				'crop' 		=> false,
			),
			'images' => array(
				array(
					'id'        => $image_id,
					'max-width' => 500,
					'width'     => 500,
					'height'    => 9999,
					'crop' 		=> false,
				),
				array(
					'id'        => $image_id,
					'max-width' => 800,
					'width'     => 800,
					'height'    => 9999,
					'crop' 		=> false,
				),
				array(
					'id'        => $image_id,
					'max-width' => 1440,
					'width'     => 1440,
					'height'    => 9999,
					'crop' 		=> false,
				),
				array(
					'id'        => $image_id,
					'max-width' => 1500,
					'width'     => 1500,
					'height'    => 9999,
					'crop' 		=> false,
				),
				array(
					'id'        => $image_id,
					'min-width' => 1501,
					'width'     => 1920,
					'height'    => 9999,
					'crop' 		=> false,
				),
			),
			'attr' => array(
				'class'  => 'background__image',
			)
		) );
	}
?>
<section <?php echo $classes_attr; ?>>
	<?php echo $image; ?>
	<div class="background__content">
		<?php
			echo aquamin_acf_build_modules(
				aquamin_id(),
				array(
					'field_name' =>'nested_modules',
					'template_name' =>'module',
				)
			);
		?>
	</div>
</section>
