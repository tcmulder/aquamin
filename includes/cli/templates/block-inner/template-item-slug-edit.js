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
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Generate block editor component
 * @param {Object}   root0
 * @param {Object}   root0.attributes
 * @param {Function} root0.setAttributes
 * @param {string}   root0.className
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
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			[
				'core/paragraph',
				{
					placeholder: __(
						'template-item-title inner blocks',
						'aquamin',
					),
				},
			],
		],
	});

	// output the block's html
	return (
		<div {...innerBlocksProps}>
			{/* START: replace with your own code */}
			<RichText
				tagName="i"
				placeholder={__('template-item-title content', 'aquamin')}
				value={demoText}
				onChange={(value) => setAttributes({ demoText: value })}
			/>
			{/* END: replace with your own code */}
			{innerBlocksProps.children}
		</div>
	);
};
export default TemplateItemNamespaceEdit;
