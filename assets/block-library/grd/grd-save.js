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
	return (
		<div
			{...useBlockProps.save({ className: classnames('grd', className) })}
		>
			<div
				{...useInnerBlocksProps.save({
					className: classnames(
						'grd__grid',
						x && y && 'grd__grid--has-aspect',
						hasMedia && 'grd__grid--stretch-media'
					),
					style: {
						'--grd-count-lg': `${count.lg}`,
						'--grd-count-md': `${count.md}`,
						'--grd-count-sm': `${count.sm}`,
						...getGap(attributes, 'top'),
						...getGap(attributes, 'left'),
						...getAspect(minAspect),
					},
				})}
			/>
		</div>
	);
};
export default GridBlockSave;
