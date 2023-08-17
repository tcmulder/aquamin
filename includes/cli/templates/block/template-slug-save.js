/**
 * template-title save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
import classnames from 'classnames';

const { useBlockProps, InnerBlocks, RichText } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const TemplateNamespaceBlockSave = ({ attributes, className }) => {
	const { demoText } = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: classnames('template-slug', className),
			})}
		>
			{/* replace this demo code with your own: */}
			<RichText.Content tagName="b" value={demoText} />
			<InnerBlocks.Content />
		</div>
	);
};
export default TemplateNamespaceBlockSave;
