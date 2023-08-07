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

const { useInnerBlocksProps } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const GridItemSave = ({ attributes, className }) => {
	return (
		<div
			{...useInnerBlocksProps.save({
				className: classnames('grd__item', className),
			})}
		/>
	);
};

export default GridItemSave;
