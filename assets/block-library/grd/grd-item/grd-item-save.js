/**
 * Grid Item save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';
import { getSpan } from './grd-item-edit';

const { useBlockProps, useInnerBlocksProps } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const GridItemSave = ({ attributes, className }) => {
	const { span } = attributes;

	const blockProps = useBlockProps.save({
		className: classnames('grd__item', className),
		style: { ...getSpan(span) },
	});
	const innerBlocksProps = useInnerBlocksProps.save(
		{ ...blockProps },
		{ template: [['core/paragraph']] }
	);

	return (
		<div {...innerBlocksProps}>
			<div className="grd__frame">{innerBlocksProps.children}</div>
		</div>
	);
};

export default GridItemSave;
