<?php
/**
 * Use the component as a template.
 * 
 * Unless a higher priority template is available, use our component. (For
 * example, use wp-content/themes/theme/assets/component-library/page/page-view.php
 * unless wp-content/themes/theme/page.php exists to override it.)
 * 
 * @see https://developer.wordpress.org/reference/hooks/type_template/
 */
// single posts (and fallback for custom post type singles)
add_filter( 'single_template', 'aquamin_single_template' );
function aquamin_single_template( $template ) {
	return $template ? $template : __DIR__ . '/single-view.php';
}
// post archives (and fallback for things like category, tag, taxonomy, and custom post type archives)
add_filter( 'archive_template', 'aquamin_archive_template' );
function aquamin_archive_template( $template ) {
	return $template ? $template : __DIR__ . '/archive-view.php';
}
// main blogroll (i.e. home.php)
add_filter( 'home_template', 'aquamin_home_template' );
function aquamin_home_template( $template ) {
	return $template && 'index.php' !== basename( $template ) ? $template : __DIR__ . '/archive-view.php';
}
// comments
add_filter( 'comments_template', 'aquamin_comments_template' );
function aquamin_comments_template( $template ) {
	return file_exists( $template ) ? $template : __DIR__ . '/comments-view.php';
}
