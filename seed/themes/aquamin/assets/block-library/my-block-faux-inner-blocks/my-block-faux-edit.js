/**
 * My Block Faux editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getFauxInnerBlocks } from '../../util/block-ui/fauxInnerBlocks';

/**
 * Generate block editor component
 * @param {Object} props            Component props
 * @param {Object} props.attributes All block attributes
 * @param {string} props.clientId   ID of the block
 */
const MyBlockFauxBlockEdit = ({ attributes, clientId }) => {
	// set props for the outermost block element
	const blockProps = useBlockProps();

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			['core/heading', { content: __('Example Inner Block', 'aquamin') }],
		],
	});

	const fauxInnerBlocks = getFauxInnerBlocks(clientId);

	const isHasSelected = blockProps.className
		.split(' ')
		.some((cls) => cls === 'is-selected' || cls === 'has-child-selected');

	return (
		<div {...innerBlocksProps}>
			{isHasSelected ? (
				<>
					<em>
						{__(
							'Selected: showing editable inner blocks',
							'aquamin',
						)}
					</em>
					{innerBlocksProps.children}
				</>
			) : (
				<>
					<em>{__('Deselected: showing SSR', 'aquamin')}</em>
					<ServerSideRender
						block="aquamin/my-block-faux"
						attributes={{ ...attributes, fauxInnerBlocks }}
					/>
				</>
			)}
		</div>
	);
};
export default MyBlockFauxBlockEdit;
