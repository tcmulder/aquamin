<?php
/**
 * Gutenberg Blocks setup
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

	// prefix editor styles
	add_theme_support( 'editor-styles' );
	add_editor_style( '/dist/bundles/editor.bundle.css' );


} );

/**
 * Enqueue block editor scripts
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
$blocks = glob( AQUAMIN_ASSETS . '/block-library/*/hooks.php' );
if ( $blocks ) {
	foreach ( $blocks as $block ) {
		require_once $block;
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
 * Manage block patterns and block pattern categories
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

	// create the patterns post type
	register_post_type(
		'custom-patterns',
		array(
			'labels' => array(
				'name' => _x( 'Block Patterns', 'Taxonomy General Name', 'aquamin' ),
				'singular_name' => _x( 'Block Pattern', 'Taxonopmy Singular Name', 'aquamin' ),
				'menu_name' => __( 'Block Patterns', 'aquamin' ),
				'all_items' => __( 'All Block Patterns', 'aquamin' ),
				'parent_item' => __( 'Parent Block Pattern', 'aquamin' ),
				'parent_item_colon' => __( 'Parent Block Pattern:', 'aquamin' ),
				'new_item_name' => __( 'New Block Pattern Name', 'aquamin' ),
				'add_new_item' => __( 'Add New Block Pattern', 'aquamin' ),
				'edit_item' => __( 'Edit Block Pattern', 'aquamin' ),
				'update_item' => __( 'Update Block Pattern', 'aquamin' ),
				'separate_items_with_commas' => __( 'Separate Block Patterns with commas', 'aquamin' ),
				'search_items' => __( 'Search Block Patterns', 'aquamin' ),
				'add_or_remove_items' => __( 'Add or remove items', 'aquamin' ),
				'choose_from_most_used' => __( 'Choose from the most used items', 'aquamin' ),
				'not_found' => __( 'Not Found', 'aquamin' ),
			),
			'public' => true,
			'publicly_queryable' => is_user_logged_in(),
			'menu_position' => 20,
			'menu_icon' => 'dashicons-layout',
			'show_in_rest' => true,
			'supports' => array(
				'editor',
				'custom-fields',
				'title',
				'thumbnail',
			),
		)
	);

	// create patterns categories
	register_taxonomy(
		'custom-patterns-categories',
		'custom-patterns',
		array(
			'show_ui' => true,
			'show_admin_column'	=> true,
			'public' => true,
			'publicly_queryable' => is_user_logged_in(),
			'hierarchical' => false,
			'show_in_rest' => true,
			'labels' => array(
				'name' => 'Pattern Categories', 'Taxonomy General Name', 'aquamin',
				'singular_name' => 'Pattern Category', 'Taxonomy Singular Name', 'aquamin',
				'menu_name' => 'Pattern Categories', 'aquamin',
				'all_items' => 'All Items', 'aquamin',
				'parent_item' => 'Parent Item', 'aquamin',
				'parent_item_colon' => 'Parent Item:', 'aquamin',
				'new_item_name' => 'New Item Name', 'aquamin',
				'add_new_item' => 'Add New Item', 'aquamin',
				'edit_item' => 'Edit Item', 'aquamin',
				'update_item' => 'Update Item', 'aquamin',
				'separate_items_with_commas' => 'Separate items with commas', 'aquamin',
				'search_items' => 'Search Items', 'aquamin',
				'add_or_remove_items' => 'Add or remove items', 'aquamin',
				'choose_from_most_used' => 'Choose from the most used items', 'aquamin',
				'not_found' => 'Not Found', 'aquamin',
			),
			'capabilities' => array(
				'manage__terms' => 'edit_posts',
				'edit_terms' => 'manage_categories',
				'delete_terms' => 'manage_categories',
				'assign_terms' => 'edit_posts'
			)
		)
	);

	// register pattern categories in the block editor
	$categories = get_terms( 'custom-patterns-categories' );
	if ( $categories ) {
		foreach( $categories as $cat ) {
			register_block_pattern_category(
				$cat->slug,
				array( 'label' => $cat->name )
			);
		}
	}

	// register patterns in the block editor
	$patterns = get_posts( array(
		'post_type' => 'custom-patterns',
		'posts_per_page' => 999,
	) );

	if ( $patterns ) {
		foreach( $patterns as $pattern ) {
			$cats = array( 'uncategorized' );
			$applied_cats = wp_get_post_terms( $pattern->ID, 'custom-patterns-categories' );
			if ( $applied_cats ) {
				$cats = array_map(function ($cat) { return $cat->slug; }, $applied_cats);
			}
			register_block_pattern(
				'aquamin/pattern-' . $pattern->post_name,
				array(
					'categories'  => $cats,
					'title'       => $pattern->post_title,
					'content'     => $pattern->post_content,
				)
			);
		}
	}

} );

/**
 * Expose all reusable blocks in the WordPress back-end sidebar
 * 
 * @link https://www.billerickson.net/reusable-blocks-accessible-in-wordpress-admin-area
 */
add_action( 'admin_menu', function() {
    add_menu_page( __( 'Reusable Blocks', 'aquamin' ), __( 'Reusable Blocks', 'aquamin' ), 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
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
		window.addEventListener('load', function() {
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
					console.log('The theme is now adding .has-global-padding properly: you may remove this patch.');
				}
			}
		});
	</script>";
	echo "<style>
		h1 { opacity: 0.9; }
	</style>";
};
