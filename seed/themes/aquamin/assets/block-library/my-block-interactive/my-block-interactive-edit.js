/**
 * My Block Interactive editor interface
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
const MyBlockInteractiveBlockEdit = ({
	attributes,
	setAttributes,
	className,
}) => {
	// get the attributes we care about
	const { demoText } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps({
		className: classnames('my-block-interactive', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			[
				'core/paragraph',
				{
					placeholder: __(
						'My Block Interactive inner blocks',
						'aquamin',
					),
				},
			],
		],
	});

	return (
		<section
			data-wp-interactive="aquamin-my-block-interactive"
			data-wp-context='{ "isOpen": false }'
		>
			<div {...innerBlocksProps} data-wp-watch="callbacks.logIsOpen">
				<RichText
					tagName="b"
					placeholder={__('My Block', 'aquamin')}
					value={demoText}
					onChange={(value) => setAttributes({ demoText: value })}
				/>
				{innerBlocksProps.children}
				<button
					type="button"
					data-wp-on--click="actions.toggle"
					data-wp-bind--aria-expanded="context.isOpen"
				>
					{__('Toggle', 'aquamin')}
				</button>
				<p id="p-1" data-wp-bind--hidden="!context.isOpen">
					{__('This element is now visible!', 'aquamin')}
				</p>
			</div>
		</section>
	);
};
export default MyBlockInteractiveBlockEdit;
