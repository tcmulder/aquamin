/**
 * My Block Interactive save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Generate block HTML to save to the database
 * @param {Object} props
 * @param {Object} props.attributes
 * @param {string} props.className
 */
const MyBlockInteractiveBlockSave = ({ attributes, className }) => {
	// get the attributes we care about
	const { demoText } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps.save({
		className: classnames('my-block-interactive', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	// output the block's html
	return (
		<section
			data-wp-interactive="aquamin-my-block-interactive"
			data-wp-context='{ "isOpen": false }'
		>
			<div {...innerBlocksProps} data-wp-watch="callbacks.logIsOpen">
				<RichText.Content tagName="b" value={demoText} />
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
export default MyBlockInteractiveBlockSave;
