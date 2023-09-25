/**
 * template-item-title editor interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';

const { __ } = wp.i18n;
const { useBlockProps, useInnerBlocksProps, RichText } = wp.blockEditor;

/**
 * Generate block editor component
 */
const TemplateItemNamespaceEdit = ({
	attributes,
	setAttributes,
	className,
}) => {
	// get the attributes we care about
	const { demoText } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps({
		className: classnames('template-slug__item', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps({
		template: [['core/paragraph']],
	});

	// output the block's html
	return (
		<div {...blockProps}>
			{/* replace this demo code with your own: */}
			<RichText
				tagName="i"
				placeholder={__('template-item-title', 'aquamin')}
				value={demoText}
				onChange={(value) => setAttributes({ demoText: value })}
			/>
			{innerBlocksProps.children}
		</div>
	);
};
export default TemplateItemNamespaceEdit;
