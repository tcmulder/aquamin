<?php
/**
 * Aquamin functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Aquamin
 */

/**
 * Set up constants
 */
define( 'AQUAMIN_TEMPLATE_URL', get_template_directory_uri() );
define( 'AQUAMIN_PATH', get_template_directory() );
define( 'AQUAMIN_INC', AQUAMIN_PATH . '/includes' );
define( 'AQUAMIN_BLOCKS', AQUAMIN_PATH . '/blocks' );

/**
 * Set up the theme.
 */
require AQUAMIN_INC . '/setup.php';

/**
 * Add styles and scripts.
 */
require AQUAMIN_INC . '/enqueue.php';

/**
 * Add common reusable scripts
 */
require AQUAMIN_INC . '/libs.php';

/**
 * Add the custom blocks
 */
require AQUAMIN_BLOCKS . '/blocks.php';

/**
 * Enable command line interface
 */
require AQUAMIN_INC . '/wp-cli.php';