/**
 * template-item-title block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './edit';
import save from './save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('template-item-title', 'aquamin'),
	description: __('template-item-desc', 'aquamin'),
	icon: Icon,
	edit,
	save,
	parent: ['aquamin/template-slug'],
});
