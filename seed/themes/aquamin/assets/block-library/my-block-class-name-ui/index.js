/**
 * My Block Class Name UI block main entry point
 *
 * This file orchestrates all the script files
 * together to create a WordPress block.
 */

/**
 * Import dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import Icon from './icon.inline.svg';
import edit from './my-block-class-name-ui-edit';
import save from './my-block-class-name-ui-save';
import block from './block.json';
import { __ } from '@wordpress/i18n';

import { classNameUI } from '../../util/block-ui/classNameUI';

/**
 * TESTING NOTE: First we implement the basics of the classNameUI for this block.
 */
classNameUI({
	title: __('My Special Classes', 'aquamin'),
	slug: 'aquamin/my-special-classes',
	affectedBlocks: [block.name],
	classNames: [
		{ value: 'border-left', title: 'Border Left' },
		{ value: 'border-right', title: 'Border Right' },
	],
});

/**
 * TESTING NOTE: Although nonstandard, here we also apply more complex
 * options to a core block (normally do this as a separate block extension).
 */
classNameUI({
	title: __('My Special Class (Just One)', 'aquamin'),
	slug: 'aquamin/my-special-classes-2',
	controlProps: { label: __('Select Class (just one)', 'aquamin') },
	affectedBlocks: ['core/paragraph'],
	group: 'settings',
	wrap: <div style={{ gridColumn: '1 / -1', padding: '1em' }}></div>,
	show: ({ attributes }) => !attributes.hideCustomControls,
	multiple: false,
	classNames: [
		{ value: 'border-left', title: 'Border Left' },
		{ value: 'border-right', title: 'Border Right' },
	],
});

/**
 * Register block
 */
registerBlockType(block.name, {
	...block,
	icon: Icon,
	edit,
	save,
});
