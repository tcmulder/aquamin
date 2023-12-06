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

	// enable editor styles
	add_theme_support( 'editor-styles' );
	add_editor_style( '/dist/bundles/editor.bundle.css' );

	// get rid of core patterns
	remove_theme_support( 'core-block-patterns' );

} );

/**
 * Register all blocks in the block library based on their block.json files
 */
add_action( 'init', function() {

	// loop through all files (this is slightly faster than glob matching block.json initially)
	$dir_iterator = new RecursiveDirectoryIterator( AQUAMIN_ASSETS . '/block-library' );
	$iterator = new RecursiveIteratorIterator( $dir_iterator, RecursiveIteratorIterator::SELF_FIRST );
	foreach ( $iterator as $file ) {
		
		// if this is a block.json file
		if ( basename( $file ) === 'block.json' ) {
			
			// get info for this block
			$block_json_path = $file->getPathname();
			$attr = array();
			$json = json_decode( file_get_contents( $block_json_path ) );
			
			// handle scripts (styles work fine but scripts only work in a plugin)
			// @see https://core.trac.wordpress.org/ticket/54647 (which does not work as advertised)
			$scripts = array(
				array( 'script', 'script_handles' ),
				array( 'editorScript', 'editor_script_handles' ),
				array( 'viewScript', 'view_script_handles' )
			);
			foreach( $scripts as $script ) {
				$assets = $json->{ $script[0] } ?? false;
				if ( $assets ) {
					if ( ! is_array( $assets ) ) {
						$assets = array( $assets );
					}
					foreach( $assets as $asset ) {
						if ( str_starts_with( $asset, 'file:' ) ) {
							$asset_paths = explode( '../../../dist/', $asset );
							$asset_name = preg_replace( '/-|\//', '_', sanitize_title( $json->name ) ) . '_' . $script[1];
							if ( $asset_paths[1] ?? false ) {
								wp_register_script(
									$asset_name,
									get_template_directory_uri() . '/dist/' . $asset_paths[1],
									null,
									'1.0',
									true
								);
								$attr[ $script[1] ] = array( $asset_name );
							}
						}
					}
				}
			}
			
			// register the block from block.json
			register_block_type( $block_json_path, $attr );

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
	AQUAMIN_ASSETS . '/block-library/*/*hooks.php',
	AQUAMIN_ASSETS . '/block-edits/*/*hooks.php'
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
 * Enqueue back-end-only block editor scripts
 */
add_action( 'enqueue_block_editor_assets', 'aquamin_editor_scripts' );
function aquamin_editor_scripts() {

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
 * Apply ugly hack to set correct root editor container classes
 * 
 * Setting settings.useRootPaddingAwareAlignments to true and settings.layout.type to
 * "constrained" should result in these classes being added properly, but it does not.
 * So, we add them manually. This allows front- and back-end layouts to match, since
 * both containers are wrapped with the same classes.
 * 
 * @see https://stackoverflow.com/questions/75912533/has-global-padding-not-added-to-is-root-container-in-wordpress
 */
add_action( 'admin_footer-post.php', 'aquamin_root_editor_container_fix' ); // Fired on post edit page
add_action( 'admin_footer-post-new.php', 'aquamin_root_editor_container_fix' ); // Fired on add new post page
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
