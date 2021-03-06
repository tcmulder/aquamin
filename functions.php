<?php
/**
 * Aquamin functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Aquamin
 */

/**
 * Set up the theme.
 */
require get_template_directory() . '/inc/setup.php';

/**
 * Add styles and scripts.
 */
require get_template_directory() . '/inc/enqueue.php';

/**
 * Add common reusable scripts
 */
require get_template_directory() . '/inc/libs.php';

/**
 * Utilize Advanced Custom Fields Pro plugin.
 */
require get_template_directory() . '/inc/acf.php';
