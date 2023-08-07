/**
 * Grid block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Register inner blocks
 */
import './grd-item';

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './grd-edit';
import save from './grd-save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Grid', 'aquamin'),
	description: __('Flexible grid layout.', 'aquamin'),
	icon: Icon,
	edit,
	save,
});
