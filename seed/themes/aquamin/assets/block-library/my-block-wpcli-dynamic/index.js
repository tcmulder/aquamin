/**
 * My Block WP-CLI Dynamic block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './my-block-wpcli-dynamic-edit';
import save from './my-block-wpcli-dynamic-save';
import block from './block.json';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Register block
 */
registerBlockType(block.name, {
	...block,
	icon: Icon,
	edit,
	save,
});
