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
const { useBlockProps, InnerBlocks, RichText } = wp.blockEditor;

/**
 * Generate block editor component
 */
const TemplateItemNamespaceEdit = ({
	attributes,
	setAttributes,
	className,
}) => {
	const { demoText } = attributes;

	return (
		<div
			{...useBlockProps({
				className: classnames('template-slug__item', className),
			})}
		>
			{/* replace this demo code with your own: */}
			<RichText
				tagName="i"
				placeholder={__('template-item-title', 'aquamin')}
				value={demoText}
				onChange={(value) => setAttributes({ demoText: value })}
			/>
			<InnerBlocks template={[['core/paragraph']]} />
		</div>
	);
};
export default TemplateItemNamespaceEdit;
