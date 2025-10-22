/**
 * My Block Link save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { SimpleLink } from '../../util/block-ui/LinkSelector';

/**
 * Generate block HTML to save to the database
 * @param {Object} props            Component props
 * @param {Object} props.attributes All block attributes
 * @param {string} props.className  Block class name
 */
const MyBlockLinkBlockSave = (props) => {
	// get the props and attributes we care about
	const { attributes } = props;
	const { link } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps.save({ className: 'my-block-link' });

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	// output the block's html
	return (
		<div {...innerBlocksProps}>
			<p>
				<em>{__('Manually-created link', 'aquamin')}</em>
				<br />
				<a
					href={link?.url}
					target={link?.opensInNewTab ? '_blank' : undefined}
					rel="noreferrer"
				>
					{link?.title || <em>no link title</em>}
				</a>
			</p>
			<p>
				<em>{__('Basic link with title', 'aquamin')}</em>
				<br />
				<SimpleLink link={link} />
			</p>
			<p>
				<em>{__('Link with inner blocks', 'aquamin')}</em>
				<br />
				<SimpleLink link={link}>{innerBlocksProps.children}</SimpleLink>
			</p>
		</div>
	);
};
export default MyBlockLinkBlockSave;
