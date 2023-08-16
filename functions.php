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
define( 'AQUAMIN_ASSETS', AQUAMIN_PATH . '/assets' );

/**
 * Set up the theme.
 */
require AQUAMIN_INC . '/core.php';

/**
 * Add common reusable scripts
 */
require AQUAMIN_INC . '/util.php';

/**
 * Add the custom blocks
 */
require AQUAMIN_INC . '/blocks.php';

/**
 * Enable command line interface
 */
require AQUAMIN_INC . '/cli/wp-cli.php';
