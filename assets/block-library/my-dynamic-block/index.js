/**
 * My Dynamic Block block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './my-dynamic-block-edit';
import save from './my-dynamic-block-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('My Dynamic Block', 'aquamin'),
	description: __('The My Dynamic Block block.', 'aquamin'),
	icon: Icon,
	edit,
	save,
});
