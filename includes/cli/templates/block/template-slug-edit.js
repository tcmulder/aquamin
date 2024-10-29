/**
 * template-title editor interface
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
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {string}   props.className
 */
const TemplateNamespaceBlockEdit = ({
	attributes,
	setAttributes,
	className,
}) => {
	// get the attributes we care about
	const { demoText } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps({
		className: classnames('template-slug', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		/* TEMPLATE: inner blocks template */
	});

	return (
		<div {...innerBlocksProps}>
			{/* START: replace with your own code */}
			<RichText
				tagName="b"
				placeholder={__('template-title content', 'aquamin')}
				value={demoText}
				onChange={(value) => setAttributes({ demoText: value })}
			/>
			{/* END: replace with your own code */}
			{innerBlocksProps.children}
		</div>
	);
};
export default TemplateNamespaceBlockEdit;
