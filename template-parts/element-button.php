<?php
	/**
	 * The template part for displaying the button element.
	 */
	$link = get_sub_field( 'link' );
	$wrap = array();
	$alignment = get_sub_field( 'alignment' );
	if ( $alignment ) {
		$wrap = array(
			'open'  => '<div class="' . $alignment . '">',
			'close' => '</div>',
		);
	}
	$classes = ' button';

	// NOTE: a bit unusual, but this site only has a single style, so I'm commenting this out for now.
	// $style = get_sub_field( 'style' );
	// if ( $style ) {
	// 	foreach ( $style as $class ) {
	// 		$classes .= ' ' . $class;
	// 	}
	// }
?>
<?php echo $wrap[ 'open' ]; ?>
	<a href="<?php echo $link[ 'url' ]; ?>" <?php aquamin_el_class( 'button-element' . $classes ) ?> target="<?php echo $link[ 'target' ]; ?>">
		<?php echo $link[ 'title' ]; ?><!-- no space
	--></a>
<?php echo $wrap[ 'close' ]; ?>