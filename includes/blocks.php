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
	add_editor_style( '/dist/global/editor.bundle.css' );

	// get rid of core patterns
	remove_theme_support( 'core-block-patterns' );

	// only load assets for blocks that appear on page
	add_filter( 'should_load_separate_core_block_assets', '__return_true' );

	// disable css inlining
	add_filter( 'styles_inline_size_limit', '__return_zero' );

} );

/**
 * Register all blocks in the block library based on their block.json files
 */
add_action( 'init', function() {

	// loop through all files (this is slightly faster than glob matching block.json with regex)
	if ( is_dir( AQUAMIN_DIST . '/block-library' ) ) {
		$dir_iterator = new RecursiveDirectoryIterator( AQUAMIN_DIST . '/block-library' );
		$iterator = new RecursiveIteratorIterator( $dir_iterator, RecursiveIteratorIterator::SELF_FIRST );
		// register a block for each block.json found
		foreach ( $iterator as $file ) {
			if ( basename( $file ) === 'block.json' ) {
				register_block_type_from_metadata( $file->getPathname() );
			}
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
	AQUAMIN_DIST . '/block-library/*/*hooks.php',
	AQUAMIN_DIST . '/block-editor/*/*hooks.php'
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
 * Enqueue back-end-only block editor scripts
 */
add_action( 'enqueue_block_editor_assets', 'aquamin_editor_scripts' );
function aquamin_editor_scripts() {

	// add browsersync helper (enables block editor CSS injecting within the iframe)
	$asset = include AQUAMIN_DIST . '/config/browsersync.config.asset.php';
	wp_enqueue_script(
		'aquamin-browsersync',
		AQUAMIN_TEMPLATE_URL . '/dist/config/browsersync.config.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);

	// add editor-related scripts like global block modifications
	$asset = include AQUAMIN_DIST . '/global/editor.bundle.asset.php';
	wp_enqueue_script(
		'aquamin-editor',
		AQUAMIN_TEMPLATE_URL . '/dist/global/editor.bundle.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);

}

/**
 * Add ani to dynamic blocks
 */
add_filter( 'render_block', 'aqua_dynamic_ani', 10, 2 );
function aqua_dynamic_ani( $block_content, $block ) {

	// start with no custom class names
	$classes = '';

	// handle animation classes
	if ( ! empty( $block[ 'attrs' ][ 'aquaminClassNameAni' ] ) ) {
		$classes .= ' ani ' . implode( ' ',  array_map( function( $ani ) {
			return $ani[ 'value' ];
		}, $block[ 'attrs' ][ 'aquaminClassNameAni' ] ) );
	}

	// handle hide/show responsiveness
	if ( ! empty( $block[ 'attrs' ][ 'aquaminClassNameHide' ] ) ) {
		$classes .= ' ' . implode( ' ',  array_map( function( $ani ) {
			return $ani[ 'value' ];
		}, $block[ 'attrs' ][ 'aquaminClassNameHide' ] ) );
	}

	// if we have new stuff then send it
	if ( $classes && $block_content ) {
		return preg_replace(
			'/' . preg_quote( 'class="', '/' ) . '/',
			'class="' . trim( esc_attr( $classes ) ) . ' ',
			$block_content,
			1
		);
	}
	// just return things unchanged by default
	return $block_content;
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
