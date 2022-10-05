/**
 * Inline Paragraph editor interface
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
const InlineParagraphBlockEdit = ({ attributes, setAttributes, className }) => {
	const { templateRichText } = attributes;

	return (
		<div
			{...useBlockProps({
				className: classnames('inline-paragraph', className),
			})}
		>
			<InnerBlocks
				template={[
					[
						'core/paragraph',
						{
							placeholder: __('optional text before ', 'aquamin'),
						},
					],
					['aquamin/copyright-year'],
					[
						'core/paragraph',
						{
							placeholder: __(' optional text after', 'aquamin'),
						},
					],
				]}
				allowedBlocks={['core/paragraph', 'aquamin/copyright-year']}
			/>
		</div>
	);
};
export default InlineParagraphBlockEdit;
