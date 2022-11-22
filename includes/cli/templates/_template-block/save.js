/**
 * template-title save interface
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
const TemplateNamespaceBlockSave = ({ attributes, className }) => {
	const { templateRichText } = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: classnames('template-slug', className),
			})}
		>
			<b>{templateRichText}</b>
			<InnerBlocks.Content />
		</div>
	);
};
export default TemplateNamespaceBlockSave;
