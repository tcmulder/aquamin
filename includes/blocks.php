<?php
/**
 * Gutenberg Blocks setup
 * 
 * @package Aquamin
 */

/**
 * Set up block editor feature support
 *
 * @see https://www.billerickson.net/building-a-gutenberg-website/#align-wide
 */
add_action( 'after_setup_theme', function() {

	// make embeds preserve aspect ratio
	add_theme_support( 'responsive-embeds' );

	// get rid of core patterns
	remove_theme_support( 'core-block-patterns' );

	// enable editor styles

	/**
	 * WARNING: this is the correct way to enqueue block editor styling, but
	 * it's currently a known issue that it will fail if you use modern CSS like container
	 * queries, which its parser doesn't understand. If you'd like to use such
	 * CSS features, you'll need to enqueue another stylesheet via the enqueue_block_assets
	 * hook (note that, since you're directly enqueueing it, styling isn't scoped to the
	 * .editor-styles-wrapper container added by add_editor_style).
	 * 
	 * @see https://github.com/WordPress/gutenberg/issues/40444
	 * @see https://developer.wordpress.org/reference/functions/add_editor_style/#comment-5332
	 */
	add_theme_support( 'editor-styles' );
	add_editor_style( '/dist/bundles/editor.bundle.css' );

} );

/**
 * Enqueue front-end block scripts
 * 
 * Note: we do this via wp_enqueue_scripts rather than the usual
 * enqueue_block_assets so these only load on the front-end. We
 * include them on the back-end via @import "./*style.css";
 * statements in each block's editor.css file; that way we have the
 * option to remove the @import and implement custom editor styling.
 */
add_action( 'wp_enqueue_scripts', 'aquamin_block_scripts' );
function aquamin_block_scripts() {

	wp_enqueue_style(
		'aquamin-block-style',
		get_template_directory_uri() . '/dist/bundles/blocks.bundle.css',
		array(),
		aquamin_cache_break( get_stylesheet_directory() .'/dist/bundles/blocks.bundle.css' ),
		'screen'
	);
	wp_enqueue_script(
		'aquamin-block-scripts',
		get_template_directory_uri() . '/dist/bundles/blocks.bundle.js',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/dist/bundles/blocks.bundle.js' ),
		true
	);

}

/**
 * Enqueue back-end-only block editor scripts
 */
add_action( 'enqueue_block_editor_assets', 'aquamin_editor_scripts' );
function aquamin_editor_scripts() {

	wp_enqueue_script(
		'aquamin-editor-scripts',
		get_template_directory_uri() . '/dist/bundles/editor.bundle.js',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/dist/bundles/editor.bundle.js' ),
		true
	);
	wp_localize_script( 'aquamin-editor-scripts', 'aquaminLocalizedBlockEditor', array(
		'restUrl' => rtrim( get_rest_url(), '/' ),
		'siteUrl' => rtrim( get_home_url(), '/' ),
	) );

	// add browsersync helper (enables block editor CSS injecting within the iframe)
	wp_enqueue_script(
		'aquamin-browsersync',
		get_template_directory_uri() . '/dist/build/browsersync.bundle.js',
		false,
		aquamin_cache_break( get_stylesheet_directory() .'/dist/build/browsersync.bundle.js' ),
		true
	);

}

/**
 * Register all blocks in the block library
 */
add_action( 'init', function() {
	$blocks = glob( AQUAMIN_ASSETS . '/block-library/*/index.php' );
	if ( $blocks ) {
		foreach ( $blocks as $block ) {
			require_once $block;
		}
	}
} );

/**
 * Execute hooks for blocks in the block library
 * 
 * Add a hooks.php file within any block directory to use
 * add_action or add_filter features (rather than adding
 * these hooks outside the block's directory within functions.php).
 */
$hook_paths = array(
	AQUAMIN_ASSETS . '/block-library/*/hooks.php',
	AQUAMIN_ASSETS . '/block-edits/*/hooks.php'
);
foreach ( $hook_paths as $path ) {
	$hooks = glob( $path );
	if ( $hooks ) {
		foreach ( $hooks as $hooks ) {
			require_once $hooks;
		}
	}
}

/**
 * Add our own block category
 */
add_filter( 'block_categories' , function( $categories ) {
	$categories[] = array( 'slug'  => 'aquamin-blocks', 'title' => __( 'Custom Blocks', 'aquamin' ) );
	return $categories;
} );

/**
 * Manage Expose all synced patterns in the WordPress back-end sidebar
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/
 */
add_action( 'after_setup_theme', function() {

	// register aquamin block category
	add_filter( 'block_categories', function( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'aquamin',
					'title' => __( 'Aquamin', 'aquamin' ),
				),
			)
		);
	}, 10, 2 );

} );

/**
 * Expose all synced patterns under Appearance > Synced Patterns
 * 
 * @link https://www.billerickson.net/reusable-blocks-accessible-in-wordpress-admin-area
 */
add_action( 'admin_menu', function() {
	add_submenu_page(
        'themes.php',
        __( 'Synced Patterns', 'aquamin' ),
        __( 'Synced Patterns', 'aquamin' ),
        'edit_posts',
        'edit.php?post_type=wp_block'
    );
} );

/**
 * Apply ugly hack to set correct root editor container classes
 * 
 * Setting settings.useRootPaddingAwareAlignments to true and settings.layout.type to
 * "constrained" should result in these classes being added properly, but it does not.
 * So, we add them manually. This allows front- and back-end layouts to match, since
 * both containers are wrapped with the same classes.
 * 
 * @see https://stackoverflow.com/questions/75912533/has-global-padding-not-added-to-is-root-container-in-wordpress
 */
add_action('admin_footer-post.php', 'aquamin_root_editor_container_fix'); // Fired on post edit page
add_action('admin_footer-post-new.php', 'aquamin_root_editor_container_fix'); // Fired on add new post page
function aquamin_root_editor_container_fix() {
    echo "<script>
		function fixRoot() {
			var rootContainer = null;
			var editorCanvas = document.querySelector('iframe[name=\"editor-canvas\"]');
			if (editorCanvas) {
				rootContainer = editorCanvas.contentWindow.document.querySelector('.is-root-container');
			} else {
				rootContainer = document.querySelector('.is-root-container');
			}
			if (rootContainer) {
				if (!rootContainer.classList.contains('has-global-padding')) {
					rootContainer.classList.remove('is-layout-flow');
					rootContainer.classList.add('has-global-padding');
					rootContainer.classList.add('is-layout-constrained');
				} else {
					console.error('The theme is now adding .has-global-padding properly: you may remove this patch.');
				}
			}
		}
		typeof jQuery === 'function' && jQuery(document).ready(fixRoot);
		window.addEventListener('load', fixRoot);
	</script>";
};
