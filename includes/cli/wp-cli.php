<?php
/*
Plugin Name: Aquamin WP-CLI Helpers
Plugin URI: https://www.thinkaquamarine.com
Description: WP-CLI helpers for working with the aquamin theme.
Author: @tcmulder
Version: 2.0.0
Author URI: https://www.thinkaquamarine.com
*/

/**
 * Main entry point for aquamin's WP-CLI.
 * 
 * @package AquaminCLI
 */

namespace AquaminCLI;

defined( 'ABSPATH' ) || exit; // exit if accessed directly


/**
 * Define constants.
 */
define( 'AQUAMIN_WP_CLI_LIB', 'lib/' );

/**
 * Include related files.
 */
require_once AQUAMIN_WP_CLI_LIB . 'wp-cli-util.php';
require_once AQUAMIN_WP_CLI_LIB . 'commands/wp-cli-setup.php';
require_once AQUAMIN_WP_CLI_LIB . 'commands/wp-cli-block.php';
require_once AQUAMIN_WP_CLI_LIB . 'commands/wp-cli-component.php';
require_once AQUAMIN_WP_CLI_LIB . 'wp-cli-register.php';

/**
 * Initialize registration of wp-cli commands.
 */
Register\init();
