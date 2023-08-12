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
import { getGap, getAspect } from './grd-edit';

const { useBlockProps, useInnerBlocksProps } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const GridBlockSave = ({ attributes, className }) => {
	const { count, hasMedia, minAspect } = attributes;
	const { x, y } = minAspect;
	const hasAspect = x && y;

	const blockProps = useBlockProps.save({
		className: classnames(
			'grd',
			hasAspect && 'grd--has-aspect',
			hasMedia && 'grd--stretch-media',
			className
		),
		style: {
			'--grd-count-lg': `${count.lg}`,
			'--grd-count-md': `${count.md}`,
			'--grd-count-sm': `${count.sm}`,
			...getGap(attributes, 'top'),
			...getGap(attributes, 'left'),
			...getAspect(minAspect),
		},
	});
	const innerBlocksProps = useInnerBlocksProps.save(
		{ ...blockProps },
		{
			template: Array(4).fill(['aquamin/grd-item']),
			allowedBlocks: ['aquamin/grd-item'],
			orientation: 'horizontal',
		}
	);

	return <div {...innerBlocksProps}>{innerBlocksProps.children}</div>;
};
export default GridBlockSave;
