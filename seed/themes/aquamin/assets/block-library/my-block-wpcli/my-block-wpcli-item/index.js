/**
 * My Block WP-CLI Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import Icon from './icon.inline.svg';
import edit from './my-block-wpcli-item-edit';
import save from './my-block-wpcli-item-save';
import block from './block.json';

/**
 * Register block
 */
registerBlockType(block.name, {
	...block,
	icon: Icon,
	edit,
	save,
});
