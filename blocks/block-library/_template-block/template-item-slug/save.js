/**
 * template-item-title save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';

const { useBlockProps, InnerBlocks } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const TemplateItemNamespaceSave = ({ attributes, className }) => {
	const { templateItemRichText } = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: classnames('template-slug__item', className),
			})}
		>
			<b>{templateItemRichText}</b>
			<InnerBlocks.Content />
		</div>
	);
};

export default TemplateItemNamespaceSave;
