<?php
/**
 * Search action and filter hooks.
 * 
 * This file gets loaded by functions.php, allowing
 * you to keep your hook logic within your component's
 * directory.
 */

/**
 * Use the component as a template.
 * 
 * Unless a higher priority template is available, use our component. (For
 * example, use wp-content/themes/theme/assets/component-library/page/page-render.php
 * unless wp-content/themes/theme/page.php exists to override it.)
 * 
 * @see https://developer.wordpress.org/reference/hooks/type_template/
 */
add_filter( 'search_template', 'aquamin_search_template' );
function aquamin_search_template( $template ) {
	return $template ? $template : __DIR__ . '/search-render.php';
}
