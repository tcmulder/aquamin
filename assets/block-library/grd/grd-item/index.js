/**
 * Grid Item block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './grd-item-edit';
import save from './grd-item-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Grid Item', 'aquamin'),
	description: __('Item within a grid.', 'aquamin'),
	icon: Icon,
	edit,
	save,
	parent: ['aquamin/grd'],
});
