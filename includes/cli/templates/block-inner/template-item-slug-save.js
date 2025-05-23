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

import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Generate block HTML to save to the database
 * @param {Object} props            Component props
 * @param {Object} props.attributes All block attributes
 * @param {string} props.className  Block class name
 */
const TemplateItemNamespaceSave = (props) => {
	// get the props and attributes we care about
	const { attributes, className } = props;
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
			{/* START: replace with your own code */}
			<RichText.Content tagName="i" value={demoText} />
			{/* END: replace with your own code */}
			{innerBlocksProps.children}
		</div>
	);
};

export default TemplateItemNamespaceSave;
