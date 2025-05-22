/**
 * My Block editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Generate block editor component
 * @param props               Component properties.
 * @param props.attributes    All block attributes.
 * @param props.setAttributes Function to update block attributes.
 * @param props.className     Block classes.
 */
const MyBlockBlockEdit = ({ attributes, setAttributes, className }) => {
	// get the attributes we care about
	const { demoText } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps({
		className: classnames('my-block-noninteractive', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps(blockProps);

	return (
		<div {...innerBlocksProps}>
			{/* START: replace with your own code */}
			<RichText
				tagName="b"
				placeholder={__('My Block Noninteractive content', 'aquamin')}
				value={demoText}
				onChange={(value) => setAttributes({ demoText: value })}
			/>
			{/* END: replace with your own code */}
			{innerBlocksProps.children}
		</div>
	);
};
export default MyBlockBlockEdit;
