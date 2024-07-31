/**
 * My Block WP-CLI block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Import dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import Icon from './icon.inline.svg';
import edit from './my-block-wpcli-edit';
import save from './my-block-wpcli-save';
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
