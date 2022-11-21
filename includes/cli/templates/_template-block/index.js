/**
 * template-title block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Import dependencies
 */
import Icon from '../../icons/general.inline.svg';
import edit from './edit';
import save from './save';
import block from './block.json';

/**
 * Register inner blocks
 */
import './template-item-slug';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('template-title', 'aquamin'),
	description: __('template-desc', 'aquamin'),
	icon: Icon,
	edit,
	save,
});