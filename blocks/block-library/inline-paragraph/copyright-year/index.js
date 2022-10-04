/**
 * Copyright Year block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress child block.
 */

/**
 * Import dependencies
 */
import Icon from '../../../icons/general.inline.svg';
import edit from './edit';
import save from './save';
import block from './block.json';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Copyright Year', 'aquamin'),
	description: __(
		'Current year, automatically updated each year.',
		'aquamin'
	),
	icon: Icon,
	edit,
	save,
});
