/**
 * My Block WP-CLI save interface
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
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Generate block HTML to save to the database
 * @param {Object} root0
 * @param {Object} root0.attributes
 * @param {string} root0.className
 */
const MyBlockWPCLIBlockSave = ({ attributes, className }) => {
	// get the attributes we care about
	const { demoText } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps.save({
		className: classnames('my-block-wpcli', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	// output the block's html
	return (
		<div {...innerBlocksProps}>
			{/* START: replace with your own code */}
			<RichText.Content tagName="b" value={demoText} />
			{/* END: replace with your own code */}
			{innerBlocksProps.children}
		</div>
	);
};
export default MyBlockWPCLIBlockSave;
