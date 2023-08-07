/**
 * Grid save interface
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

const { useBlockProps, useInnerBlocksProps } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const GridBlockSave = ({ attributes, className }) => {
	const { count, hasEqualRows, minAspect } = attributes;
	const style = {
		'--grd-count-lg': `${count[0]}`,
		'--grd-count-md': `${count[1]}`,
		'--grd-count-sm': `${count[2]}`,
		'--grd-aspect': !minAspect.includes(0)
			? `${minAspect[0]}/${minAspect[1]}`
			: 'auto',
	};
	return (
		<div
			{...useInnerBlocksProps.save()}
			{...useBlockProps.save({
				className: classnames('grd', className),
				style,
			})}
		/>
	);
};
export default GridBlockSave;
