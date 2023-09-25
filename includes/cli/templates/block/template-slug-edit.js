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

const { __ } = wp.i18n;
const { useBlockProps, useInnerBlocksProps, RichText } = wp.blockEditor;

/**
 * Generate block editor component
 */
const TemplateNamespaceBlockEdit = ({ attributes, setAttributes, className }) => {
	// get the attributes we care about
	const { demoText } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps({
		className: classnames('template-slug', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps(blockProps /* PLACEHOLDER: inner blocks template */ );

	return (
		<div {...innerBlocksProps}>
			{/* replace this demo code with your own: */}
			<RichText
				tagName="b"
				placeholder={__('template-title', 'aquamin')}
				value={demoText}
				onChange={(value) => setAttributes({ demoText: value })}
			/>
			{innerBlocksProps.children}
		</div>
	);
};
export default TemplateNamespaceBlockEdit;
