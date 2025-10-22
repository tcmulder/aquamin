/**
 * My Block Link editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { LinkSelector, SimpleLink } from '../../util/block-ui/LinkSelector';

/**
 * Generate block editor component
 * @param {Object}   props               Component props
 * @param {Object}   props.attributes    All block attributes
 * @param {Function} props.setAttributes Function to set block attributes
 * @param {string}   props.className     Block class name
 */
const MyBlockLinkBlockEdit = (props) => {
	// get the props and attributes we care about
	const { attributes, setAttributes, className, isSelected } = props;
	const { link } = attributes;

	// set props for the outermost block element
	const blockProps = useBlockProps({
		className: 'my-block-link',
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			[
				'core/paragraph',
				{ placeholder: __('My Block Link inner blocks', 'aquamin') },
			],
		],
	});

	return (
		<div {...innerBlocksProps}>
			<LinkSelector
				link={link}
				setAttributes={setAttributes}
				show={isSelected}
			/>
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
				<SimpleLink editable link={link} />
			</p>
			<p>
				<em>{__('Link with inner blocks', 'aquamin')}</em>
				<br />
				<SimpleLink editable link={link}>
					{innerBlocksProps.children}
				</SimpleLink>
			</p>
		</div>
	);
};
export default MyBlockLinkBlockEdit;
