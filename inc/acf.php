<?php
/**
 * Advanced Custom Fields Pro default Aquamin theme functionality.
 */
if ( class_exists( 'acf' ) ) {

	/**
	 * Replace the_content with ACF.
	 */
	add_filter( 'the_content', 'aquamin_acf_content_replace' );
	function aquamin_acf_content_replace( $content ) {

		// prep to store captured content
		$return_content = '';

		// get post's id (possibly if not single then the page used for this page's content)
		$post_id = aquamin_id();

		// only execute if on the front-end and there are fields to capture
		if ( ! is_admin() ) {
			if ( get_field( 'modules', $post_id ) ) {
				$return_content = aquamin_acf_build_modules( $post_id );
			}
		}
		// return either what's been captured or pass $content through
		return ('' !== $return_content ? $return_content : $content);

	}

	/**
	 * Get output of ACF Modules group.
	 */
	function aquamin_acf_build_modules( $post_id ) {
		// grab html in the buffer
		ob_start();
			if ( have_rows( 'modules', $post_id ) ) {
				while( have_rows( 'modules', $post_id ) ) {
					the_row();
					// output the module HTML to be captured by the buffer
					echo get_template_part( 'template-parts/module', get_row_layout() );
				}
			}
		// capture buffer output and return it
		$return_content = ob_get_clean();
		return ( $return_content ? $return_content : false );
	}

}
