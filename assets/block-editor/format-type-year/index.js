/**
 * Inline Year format types
 */

import { __ } from '@wordpress/i18n';
import { registerFormatType, insert, create } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Setup conditional inserter button
 */
function ConditionalButton({ isActive, onChange, value }) {
	// get this block
	const selectedBlock = useSelect((select) => {
		return select('core/block-editor').getSelectedBlock();
	}, []);

	// if we have paragraph
	if (selectedBlock?.name !== 'core/paragraph') {
		return null;
	}

	// add a button for inserting the current year (on the front end)
	return (
		<RichTextToolbarButton
			icon="calendar-alt"
			title={__('Inline Year', 'aquamin')}
			onClick={() => {
				const valueToInsert = create({
					html: `<span class="current-year" title="Current Year"><span>`,
				});
				onChange(insert(value, valueToInsert));
			}}
			isActive={isActive}
		/>
	);
}

// register the new format type for year
registerFormatType('aquamin/year', {
	name: 'aquamin/year',
	title: __('Inline Year', 'aquamin'),
	object: true,
	tagName: 'span',
	className: 'current-year-wrap',
	edit: ConditionalButton,
});
