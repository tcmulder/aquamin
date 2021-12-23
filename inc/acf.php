<?php
/**
 * Advanced Custom Fields Pro default Aquamin theme functionality.
 */
if ( class_exists( 'acf' ) ) {

	    /**
     * Replace the_content with ACF.
     */
    add_filter( 'the_content', 'aquamin_acf_content_replace', 10, 2 );
    function aquamin_acf_content_replace( $content, $post_id=0 ) {

        // prep to store captured content
        $return_content = '';

        // get post's id (possibly if not single then the page used for this page's content)
        $post_id = ( $post_id ? $post_id : aquamin_id() );

        // only execute if on the front-end and there are fields to capture
        if ( ! is_admin() ) {
            if ( post_password_required() ) {
                $return_content = get_the_password_form();
            } elseif ( get_field( 'modules', $post_id ) ) {
                $return_content = aquamin_acf_build_modules( $post_id );
            }
        }
        // return either what's been captured or pass $content through
        return ('' !== $return_content ? $return_content : $content);

    }

	/**
	 * Get output of ACF Modules group.
	 */
	function aquamin_acf_build_modules( $post_id, $opt = null ) {

		$field_name = ( $opt[ 'field_name' ] ? $opt[ 'field_name' ] : 'modules' );
		$template_name = ( $opt[ 'template_name' ] ? $opt[ 'template_name' ] : 'module' );

		// grab html in the buffer
		ob_start();
			if ( have_rows( $field_name, $post_id ) ) {
				// /*DEBUG*/ $debug = 0;
				while( have_rows( $field_name, $post_id ) ) {
					// /*DEBUG*/ echo $debug++; if($debug > 5){ exit; }
					the_row();
					// output the module HTML to be captured by the buffer
					include locate_template( 'template-parts/' . $template_name . '-' . get_row_layout() . '.php' );
				}
			}
		// capture buffer output and return it
		$return_content = ob_get_clean();
		return ( $return_content ? $return_content : false );
	}

	/**
	 * Save ACF as the_content (e.g. for search and seo plugins)
	 */
	add_action( 'save_post', 'save_acf_to_the_content', 20 );
	function save_acf_to_the_content( $post_id ) {
		// identify which post types this should apply to
		$types = array( 'all-the-things', 'page' );
		if( isset( $_POST[ 'acf' ] ) && in_array( get_post_type( $post_id ), $types ) ) {
			// configure compression options
			$strip_whitespace = true;
			$strip_html = false;
			// start with no content
			$acf_content = '';
			// must call once before checking if (first call===false even if true)
			have_rows( 'modules', $post_id );
			// collect content as seen on typical pages
			if ( have_rows( 'modules', $post_id ) ) {
				$acf_content .= aquamin_acf_build_modules(
					$post_id,
					array(
						// field group info
						'field_name' =>'modules',
						'template_name' =>'module',
					)
				);
			}
			// run compression
			if ( $strip_whitespace ) {
				$acf_content = preg_replace( '/\s+/', ' ', $acf_content );
			}
			if ( $strip_html ) {
				$acf_content = wp_strip_all_tags( $acf_content );
			}
			// update the_content with acf text
			$this_post = array(
				'ID' => $post_id,
				'post_content' => $acf_content,
			);
			// don't infinitely trigger this function but run the post update once
			remove_action( 'save_post', 'save_acf_to_the_content', 20 );
			wp_update_post( $this_post );
			add_action( 'save_post', 'save_acf_to_the_content', 20 );
		}
	}

}
