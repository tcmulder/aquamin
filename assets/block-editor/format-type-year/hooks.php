<?php
add_filter( 'register_block_type_args', 'aquamin_format_type_year_filter', 100, 3 );
function aquamin_format_type_year_filter( $args, $name ) {
    if ( $name == 'core/paragraph' ) {
        $args['render_callback'] = function ($attributes, $content) {
            $current_year = date( 'Y' );
            return preg_replace( '/<span class="current-year" title="Current Year">.*?<\/span>/', $current_year,  $content );
        };
    }
    return $args;
}
