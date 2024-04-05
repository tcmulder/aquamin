<?php
/**
 * Aquamin standard theme setup.
 * 
 * @package Aquamin
 */
add_action( 'after_setup_theme', 'aquamin_setup' );
if ( ! function_exists( 'aquamin_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function aquamin_setup() {

		/**
		 * Execute hooks for component library
		 * 
		 * Add a hooks.php file within any component directory to use
		 * add_action or add_filter features (rather than adding
		 * these hooks outside the component's directory within functions.php).
		 */
		$hook_paths = array(
			AQUAMIN_DIST . '/component-library/*/*hooks.php',
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
		 * Setup general content (like footers)
		 */
		register_post_type(
			'aquamin-general',
			array(
				'labels' => array(
					'name' => _x( 'Global Content', 'Taxonomy General Name', 'aquamin' ),
					'singular_name' => _x( 'Global Content', 'Taxonopmy Singular Name', 'aquamin' ),
					'menu_name' => __( 'Global Content', 'aquamin' ),
					'all_items' => __( 'Global Content', 'aquamin' ),
					'parent_item' => __( 'Parent Global Content', 'aquamin' ),
					'parent_item_colon' => __( 'Parent Global Content:', 'aquamin' ),
					'new_item_name' => __( 'New Global Content Name', 'aquamin' ),
					'add_new_item' => __( 'Add New Global Content', 'aquamin' ),
					'edit_item' => __( 'Edit Global Content', 'aquamin' ),
					'update_item' => __( 'Update Global Content', 'aquamin' ),
					'separate_items_with_commas' => __( 'Separate Global Content with commas', 'aquamin' ),
					'search_items' => __( 'Search Global Content', 'aquamin' ),
					'add_or_remove_items' => __( 'Add or remove items', 'aquamin' ),
					'choose_from_most_used' => __( 'Choose from the most used items', 'aquamin' ),
					'not_found' => __( 'Not Found', 'aquamin' ),
				),
				'public' => false,
				'show_in_rest' => true,
				'show_in_menu' => 'themes.php',
				'show_in_nav_menus' => true,
				'show_ui' => true,
				'menu_position' => 20,
				'menu_icon' => 'dashicons-button',
				'supports' => array(
					'editor',
					'custom-fields',
					'title',
					'thumbnail',
				),
			)
		);

		/**
		 * Enqueue theme front-end styles and scripts
		 */
		add_action( 'wp_enqueue_scripts', 'aquamin_theme_scripts' );
		function aquamin_theme_scripts() {

			$asset = include AQUAMIN_DIST . '/global/theme.bundle.asset.php';
			$foo = AQUAMIN_DIST . '/global/theme.bundle.css';
			wp_enqueue_style(
				'aquamin-style',
				AQUAMIN_TEMPLATE_URL . '/dist/global/theme.bundle.css',
				false,
				$asset['version'],
				'screen'
			);
			wp_enqueue_script(
				'aquamin-scripts',
				AQUAMIN_TEMPLATE_URL . '/dist/global/theme.bundle.js',
				$asset['dependencies'],
				$asset['version'],
				true
			);

		}

		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 */
		load_theme_textdomain( 'aquamin', get_template_directory() . '/languages' );

		/**
		 * Add default posts and comments RSS feed links to head.
		 */
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/**
		 * This theme uses wp_nav_menu() in two locations by default.
		 */
		register_nav_menus( array(
			'head-menu' => esc_html__( 'Header Menu', 'aquamin' ),
		) );

		/**
		 * Make embeds preserve aspect ratio
		 */
		add_theme_support( 'responsive-embeds' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		/**
		 * Add theme support for selective refresh for widgets.
		 */
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add theme attribution
		 */
		add_filter( 'admin_footer_text', 'aquamin_custom_admin_footer' );
		function aquamin_custom_admin_footer() {
			$svg = '<svg xmlns="http://www.w3.org/2000/svg" width="90" style="margin-bottom:-10px" viewBox="0 0 1000 324"><g fill="#00CAA9"><path d="M416 176c-2 3 4 30-6 22-11-9-12-5-26 0-3 2-7 2-10 2s-5 0-7-2-3-5-3-9l2-10a52 52 0 0 1-14 15 44 44 0 0 1-23 6h-6l-5-2-4-5a15 15 0 0 1-1-9l3-9 9-18 11-20 5-5a11 11 0 0 1 8-1l2 1 2 1 1 3v2l-2 4a480 480 0 0 0-19 40l3 2c4 0 8-1 12-4l10-8 8-11a130 130 0 0 0 13-24l3-5 5-2 6 2 2 6-2 4a118 118 0 0 1-7 15 131 131 0 0 0-7 17l-1 8c0 2 1 4 4 4l7-2c3-1 5-1 9-8s5-17 12-21c6-5 3 11 6 8v13zm23-30l-8 2-8 6-5 8a24 24 0 0 0 0 17l2 3 4 1 5-2 6-5a75 75 0 0 0 15-22l-1-4-3-2a15 15 0 0 0-7-2zm29 56c-5 0-10-2-12-3l-3-4-3-5a23 23 0 0 1 1-13 116 116 0 0 1-15 16l-8 5c-4 2-7 2-10 2a20 20 0 0 1-16-10c-2-2-2-5-2-8l1-9a66 66 0 0 1 18-33c3-3 7-5 12-7 4-2 9-3 14-3l7 1 5 3 4 3a53 53 0 0 1 7-3 9 9 0 0 1 8 2c2 1 2 2 2 4v1l-1 4-2 6c-10 13-12 16-14 24-1 8-1 17 12 12 13-7 18-14 27-31s16-15 16-9c0 21-21 52-48 55zm176-56l-8 2-8 6-5 8a24 24 0 0 0 0 17l2 3 4 1 5-2 6-5a75 75 0 0 0 15-22l-1-4-3-2a15 15 0 0 0-7-2zm64 25c-1 1-15 29-42 29l-6-1-4-4-2-5a23 23 0 0 1 0-13 116 116 0 0 1-14 16l-9 5c-3 2-6 2-9 2a20 20 0 0 1-17-10l-2-8 1-9a66 66 0 0 1 19-33l11-7c4-2 9-3 14-3l8 1 5 3 4 3a53 53 0 0 1 6-3 9 9 0 0 1 9 2l2 4v1l-2 4a1771 1771 0 0 1-9 32l1 5 3 1c1 0 11 2 30-28 20-30 5 15 3 16zm-22 7c22-16 24-39 24-44-2-4-6-5 0-10 6-4 20 4 22 6 2 1 21 13 22 20s-5 12-11 25c-5 8-1 11 2 12 2 1 16 0 32-21 17-22 6-5 10-12 2-3 5-1 4 2 0 2-9 50-14 41-5-10-11-8-17-5l-16 5c-33 3-13-24-10-31s10-12 1-19c-10-7-7-6-11-6-3 6-5 31-35 51-26 13-25 2-3-14zm-147-26l1-2-1-3-2-1-8 2-18 22-14 16c-3-3-24 3-8-10 7-6 9-13 11-21 4-12-5-16 0-20 7-7 14-1 15 0s2 8 1 10a1444 1444 0 0 0 12-10l7-4 10-1h4l5 3 3 3 1 6a69 69 0 0 1 10-8l6-3a27 27 0 0 1 14-1l5 3 3 4 1 6c0 3 0 7-2 10a51 51 0 0 1-9 13 69 69 0 0 0-7 10l-1 4 1 3h3c3 0 6 0 9-2 3-1 9-1 24-31 39-17-3 14-1 13l1-1 2-1 3 2 1 4-1 4-4 4c-3 4-1 22-7 17-7-4-10-2-14 0-3 3-7 4-10 6l-11 2c-5 0-8-1-11-3-3-3-4-6-4-11l1-8 5-8 5-8a62 62 0 0 0 7-10v-2l-1-3-2-1-7 2c-3 1-3 0-9 7s-13 19-21 15c-9-4 2-17 2-18zm260-34a14 14 0 0 1 3-9l4-3 6-1c4 0 6 0 8 2l2 5-1 4-2 4-4 3-5 1c-4 0-7 0-8-2l-3-4zm-10 20c1-1 2-3 4-3l4-1c2 0 4 0 6 2a7 7 0 0 1 2 7v2a157 157 0 0 0-9 19 105 105 0 0 0-5 11l-1 5 1 3 4 1 5-1 6-3 6-4c1-1 15-15 22-29 7-13-2 23-3 24 0 2-2 3-3 5-3 3-9 24-11 22-2-8-5-7-9-5l-10 5c-4 2-7 2-11 2-5 0-9-1-12-3-2-3-4-7-4-13l1-8a70 70 0 0 1 7-15 77 77 0 0 0 5-11 189 189 0 0 1 5-12zm59-5c13-3 4 9 4 10l-1 3 6-6a54 54 0 0 1 27-10c3 0 6 1 8 3 2 1 3 4 3 8l-1 7a53 53 0 0 1-6 14c-1 3-14 23-8 25 7 3 40-13 53-18 12-5 11 6 3 10-10 2-43 21-68 21l-7-2c-2-2-2-5-2-8a16 16 0 0 1 0-3l1-6a71 71 0 0 1 8-14 328 328 0 0 0 8-17l-1-2-2-1-12 3-10 9-8 11a744 744 0 0 0-23 30c-2 0-4 0-5-2l-2-5 2-5a147 147 0 0 1 8-18l5-11 6-12c3-6 0-12 14-14zm110 10h-2l-7 1-5 4-5 5a69 69 0 0 0-8 16 103 103 0 0 0 14-8 163 163 0 0 0 14-11l2-4-1-2-2-1zm3-13c5 0 9 2 12 4 2 2 3 6 3 10 0 3 0 6-2 9-1 2-3 5-7 8l-13 9-21 10 3 4 6 1 9-1a75 75 0 0 0 19-7c3-2 9-4 14-17 3-10 16-8 16 5 0 9-24 22-27 24a114 114 0 0 1-24 10l-13 1a22 22 0 0 1-17-8c-3-2-4-5-5-8l-2-10 2-9 4-9a59 59 0 0 1 17-18l12-6 14-2z"/><path d="M261 233c-7 13-12 21-15 29-9 17-9 28-3 35 9 9 21 7 29-6 9-16 7-38-9-60l-2 2zm17-50l-1-1-6 4-8 2a17 17 0 0 1-14-8l-4-7-1-10a48 48 0 0 1 10-29l9-11a70 70 0 0 1 21-11l8-2 8 2 5 3 4 5a54 54 0 0 1 6-5l2-1 6 2 1 5-1 5-25 44a342 342 0 0 1-13 25l-10 16a1418 1418 0 0 1-5 9l-7 11-1-2-6-10-1-4c0-5 2-9 6-12l7-3 12-2c10-2 23 4 29 7 37 19 117 26 205 21 87-4 410-37 462 15 24 24 6 29-11 18-88-56-346-30-444-24-99 7-162 0-228-26-13-5-14 1-18 2l-7 2-1 1 3 6 2 2c19 26 22 54 10 75-11 19-36 36-51 20-11-13-10-32 0-53a465 465 0 0 1 25-45l5-8a1172 1172 0 0 0 17-28zm23-51a12 12 0 0 0-6-6l-5-1c-4 0-8 1-11 3-4 2-7 5-9 9a42 42 0 0 0-8 23l1 6c1 2 2 2 4 2s5 0 7-2c3-1 6-3 8-6l9-12 10-16z"/><path d="M87 124c26-61 38-87 77-97 22-6 37 35 23 86-9 33-28 88-29 92-71-79-72-75-103-88-26-11-53-3-55 4-2 6 14 30 45 39 42 12 102 11 113 10l29-3c11-2 28-6 43-12 11-4 16-7 16 10 0 3 25-30 23-33s0-13-2-11c-21 18-58 31-74 34l-35 7c-11 1-79-4-113-16-11-4-21-12-21-16 0-5 19-5 31 0 15 6 51 16 98 100 3 6 19 7 20 0 1-5 33-105 38-146 7-46 5-88-28-84-45 6-81 55-108 119L41 253c-1 3 4 11 10 11 7 0 8-12 7-15-6-20 28-124 29-125z"/></g></svg>';
			return '<span id="footer-thankyou">Theme by <a href="https://www.thinkaquamarine.com/" target="_blank">' . $svg . '</a></span>';
		}

		/**
		 * Aquamarine-ize the interface (from Admin Color Schemes plugin originally)
		 */
		add_action( 'admin_init' , 'aquamin_aquamarine_colors' );
		function aquamin_aquamarine_colors() {
			$user = wp_get_current_user();
			if ( 'aquaadmin' === $user->user_login ) {
				wp_admin_css_color(
					'aquamarine', __( 'Aquamarine', 'admin_schemes' ),
					get_template_directory_uri() . '/assets/global/admin-aquamarine.css',
					array( '#1F2C39', '#2c3e50', '#1abc9c', '#f39c12' ),
					array( 'base' => '#f1f2f3', 'focus' => '#fff', 'current' => '#fff' )
				);
				// automatically use it for localhost
				if ( $_SERVER['REMOTE_ADDR'] === '127.0.0.1' && 'aquamarine' !== get_user_option( 'admin_color' ) ) {
					update_user_option( get_current_user_id(), 'admin_color', 'aquamarine' );
				}
			}
		}

		/**
		 * Disable unwanted WordPress scripts
		 */
		add_action( 'wp_enqueue_scripts', 'aquamin_disable_scripts' );
		function aquamin_disable_scripts() {

			wp_deregister_script( 'wp-embed' );
			remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
			remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
			remove_action( 'wp_print_styles', 'print_emoji_styles' );
			remove_action( 'admin_print_styles', 'print_emoji_styles' );
			remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
			remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
			remove_action( 'wp_print_styles', 'print_emoji_styles' );
			remove_action( 'admin_print_styles', 'print_emoji_styles' );
			remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
			remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
			remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
			remove_action( 'wp_head', 'wp_generator' );
			remove_action( 'wp_head', 'rsd_link' );
			add_filter( 'tiny_mce_plugins', function ( $plugins ) {
				if ( is_array( $plugins ) && in_array( 'wpemoji', $plugins, true ) ) {
					return array_diff( $plugins, array( 'wpemoji' ) );
				}
				return $plugins;
			} );
			add_filter( 'wp_resource_hints', function( $urls, $relation_type ) {
				if ( 'dns-prefetch' === $relation_type ) {
					$urls = array_values( array_diff( $urls, array( apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' ) ) ) );
				}
				return $urls;
			}, 10, 2 );

		}

		/**
		 * Add custom scripts fields
		 * 
		 * Adds fields for adding custom embed scripts at
		 * ...</head>, <body>..., and/or ...</body>. Options
		 * page available under Settings > Custom Scripts.
		 * 
		 * Supports shortcodes, so you could create a shortcode
		 * for excluding a specific post type, list of page
		 * IDS, etc. if necessary.
		 */

		// create the settings page
		add_action( 'admin_menu', 'aquamin_create_custom_scripts_options_page' );
		function aquamin_create_custom_scripts_options_page() {
			add_options_page( __( 'Custom Scripts', 'aquamin' ), __( 'Custom Scripts', 'aquamin' ), 'administrator', __FILE__, function() {
				ob_start();
					settings_fields('aquamin_custom_scripts');
				$fields = ob_get_clean();
				ob_start();
					do_settings_sections(__FILE__);
				$section = ob_get_clean();
				printf(
					'<form method="post" action="options.php" enctype="multipart/form-data">
						%s%s
						<input name="Submit" type="submit" class="button-primary" value="%s" />
					</form>',
					$fields,
					$section,
					__( 'Save Changes', 'aquamin' )
				);
			});
		}

		// register custom script fields
		add_action( 'admin_init', 'aquamin_register_custom_scripts_fields' );
		function aquamin_register_custom_scripts_fields() {
			register_setting( 'aquamin_custom_scripts', 'aquamin_custom_scripts', null ) ;
			add_settings_section('main_section', 'Custom Scripts', function() {
				printf( '<p>%s</p>', __( 'Embed scripts on the front-end of the website.', 'aquamin' ) );
				printf( '<div class="update-nag notice notice-warning inline">%s</div>', __( 'WARNING: be very carful changing these settings, or you could break your site.', 'aquamin' ) );
			}, __FILE__);
			add_settings_field( 'aquamin_custom_scripts_closing_header', 'Before closing &lt;/head&gt;', function() {
				$options = get_option( 'aquamin_custom_scripts' );
				$code = $options['aquamin_custom_scripts_closing_header'] ?? '';
				echo '<textarea name="aquamin_custom_scripts[aquamin_custom_scripts_closing_header]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
			}, __FILE__, 'main_section');
			add_settings_field( 'aquamin_custom_scripts_opening_body', 'Before opening &lt;body&gt;', function() {
				$options = get_option( 'aquamin_custom_scripts' );
				$code = $options['aquamin_custom_scripts_opening_body'] ?? '';
				echo '<textarea name="aquamin_custom_scripts[aquamin_custom_scripts_opening_body]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
			}, __FILE__, 'main_section');
			add_settings_field( 'aquamin_custom_scripts_closing_body', 'Before closing &lt;/body&gt;', function() {
				$options = get_option( 'aquamin_custom_scripts' );
				$code = $options['aquamin_custom_scripts_closing_body'] ?? '';
				echo '<textarea name="aquamin_custom_scripts[aquamin_custom_scripts_closing_body]" rows="10" cols="60" type="textarea">' . $code . '</textarea>';
			}, __FILE__, 'main_section');
		}

		// add code to appropriate places in theme
		add_action( 'wp_head', function() {
			$options = get_option( 'aquamin_custom_scripts' );
			echo do_shortcode( $options['aquamin_custom_scripts_closing_header'] ?? '' );
		}, 99 );
		add_action( 'wp_body_open', function() {
			$options = get_option( 'aquamin_custom_scripts' );
			echo do_shortcode( $options['aquamin_custom_scripts_opening_body'] ?? '' );
		}, 99 );
		add_action( 'wp_footer', function() {
			$options = get_option( 'aquamin_custom_scripts' );
			echo do_shortcode( $options['aquamin_custom_scripts_closing_body'] ?? '' );
		}, 99 );

		/**
		 * Allow access to current background color var
		 *
		 * This let's you do things like:
		 *	.thing {
		*		border: 1px solid var(--c-bg);
		* 	}
		* So, for .thing.has-0-000-background-color
		* you'll get a black border, and for
		* .thing.has-0-900-background-color you'll
		* get a white border, matching their respective
		* backgrounds. It's often quite useful.
		*/
		add_action( 'wp_head', 'aquamin_bg_css' );
		add_action( 'admin_head', 'aquamin_bg_css' );
		function aquamin_bg_css() {
			$colors = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
			if ( $colors ) {
				echo '<style id="aquamin-c-bg">';
				foreach( $colors as $color ) {
					echo '.has-' . $color[ 'slug' ] . '-background-color { --c-bg: var(--c-' . $color[ 'slug' ] . ') } /* ' . $color[ 'name' ] . " */\n";
				}
				echo '</style>';
			}
		}

	}
}
