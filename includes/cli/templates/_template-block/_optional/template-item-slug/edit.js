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
	const { templateItemRichText } = attributes;

	return (
		<div
			{...useBlockProps({
				className: classnames('template-slug__item', className),
			})}
		>
			<RichText
				tagName="b"
				placeholder={__('template-item-title', 'aquamin')}
				value={templateItemRichText}
				onChange={(value) =>
					setAttributes({ templateItemRichText: value })
				}
			/>
			<InnerBlocks template={[['core/paragraph']]} />
		</div>
	);
};
export default TemplateItemNamespaceEdit;
