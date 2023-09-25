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

const { useBlockProps, useInnerBlocksProps, RichText } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const TemplateItemNamespaceSave = ({ attributes, className }) => {
	// get the attributes we care about
	const { demoText } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps.save({
		className: classnames('template-slug__item', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	// output the block's html
	return (
		<div {...blockProps}>
			{/* replace this demo code with your own: */}
			<RichText.Content tagName="i" value={demoText} />
			{innerBlocksProps.children}
		</div>
	);
};

export default TemplateItemNamespaceSave;
