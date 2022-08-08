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

/**
 * Instructions ** remove this **
 */
// eslint-disable-next-line no-console
console.info(`
# Block Template Todo:

## Template Renames
- search/replace template-slug
- search/replace _template-block
- search/replace TemplateNamespace
- search/replace template-title
- search/replace template-desc

## Child Renames
- search/replace template-item-slug
- search/replace TemplateItemNamespace
- search/replace template-item-title
- search/replace template-item-desc

## File Manipulationss
- index.js: delete template-item-slug import if unneeded
- index.php: delete template-item-slug and dir if unneeded
- index.php: delete dynamic comment if unneeded
- script.js: delete file if unneeded
`);
