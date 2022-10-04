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

## Search/Replace Block Name Placeholders:
- template-slug
- _template-block
- TemplateNamespace
- template-title
- template-desc

## Search/Replace Block Child Name Placeholders:
- template-item-slug
- TemplateItemNamespace
- template-item-title
- template-item-desc

## ApplyFile Manipulations:
- index.js: delete template-item-slug import if unneeded
- index.php: delete template-item-slug and dir if unneeded
- index.php: delete dynamic comment if unneeded
- script.js: delete file if unneeded
`);
