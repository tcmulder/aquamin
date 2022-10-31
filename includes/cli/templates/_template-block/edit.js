/**
 * template-title editor interface
 *
 * This defines how the block works
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
const TemplateNamespaceBlockEdit = ({
	attributes,
	setAttributes,
	className,
}) => {
	const { templateRichText } = attributes;

	return (
		<div
			{...useBlockProps({
				className: classnames('template-slug', className),
			})}
		>
			<RichText
				tagName="b"
				placeholder={__('template-title', 'aquamin')}
				value={templateRichText}
				onChange={(value) => setAttributes({ templateRichText: value })}
			/>
			<InnerBlocks template={[['aquamin/template-item-slug']]} />
		</div>
	);
};
export default TemplateNamespaceBlockEdit;
