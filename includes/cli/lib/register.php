<?php
/**
 * WP-CLI setup, hooks, and filters, etc.
 * 
 * @package AquaminCLI
 */

namespace AquaminCLI\Register;

use WP_CLI;

defined( 'ABSPATH' ) || exit; // exit if accessed directly

/**
 * Run WordPress hooks for WP-CLI setup.
 *
 * @return void
 */
function init() {
	add_action( 'cli_init', 'AquaminCLI\Register\register_commands' );
}

/**
 * Register new WP-CLI commands.
 * 
 * @return void
 */
function register_commands() {
	WP_CLI::add_command( 'aquamin setup', '\AquaminCLI\Setup\setup' );
	WP_CLI::add_command( 'aquamin block create', '\AquaminCLI\Block\block_create' );
	WP_CLI::add_command( 'aquamin component create', '\AquaminCLI\Component\component_create' );
}
