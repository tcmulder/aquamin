/**
 * Grid Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import variations
 */
import './grd-item-variations';

/**
 * Import dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import Icon from './icon.inline.svg';
import edit from './grd-item-edit';
import save from './grd-item-save';
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
