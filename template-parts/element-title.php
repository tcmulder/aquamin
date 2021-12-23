<?php
/**
 * The template part for displaying the title nested element.
 */

    $classes = 'title-element';
	$classes .= if_sprintf( ' %s', get_sub_field( 'alignment' ) );
	$classes .= if_sprintf( ' %s', get_sub_field( 'style' ) );

	$title = get_sub_field( 'title' );

	$tag = get_sub_field( 'level' );

	$id = get_sub_field( 'id' );
    $id = ( $id ? $id : str_replace( array( "\r", "\n" ), ' ', $title ) );
	$id = sanitize_title_with_dashes( $id );

?>
<<?php echo $tag ?> <?php aquamin_el_class( $classes ); ?> id="<?php echo $id; ?>"><!--
    no space --><?php echo $title; ?>
</<?php echo $tag; ?>>