/**
 * template-title block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/* PLACEHOLDER: register inner blocks */

/**
 * Import dependencies
 */
import Icon from './icon.inline.svg';
import edit from './template-slug-edit';
import save from './template-slug-save';
import block from './block.json';
import { __ } from '@wordpress/i18n';
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
