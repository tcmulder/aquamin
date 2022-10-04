/**
 * Inline Paragraph block main entry point
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
import './copyright-year';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Inline Paragraph', 'aquamin'),
	description: __(
		'Paragraph with inline features (like copyright year).',
		'aquamin'
	),
	icon: Icon,
	edit,
	save,
});
