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
	const { count, hasEqualRows, hasMedia } = attributes;
	const aspect = getAspect(attributes);
	return (
		<div
			{...useBlockProps.save({ className: classnames('grd', className) })}
		>
			<div
				{...useInnerBlocksProps.save({
					className: classnames(
						'grd__grid',
						aspect && 'grd__grid--has-aspect',
						hasMedia && 'grd__grid--has-media'
					),
					style: {
						'--grd-count-lg': `${count[0]}`,
						'--grd-count-md': `${count[1]}`,
						'--grd-count-sm': `${count[2]}`,
						'--grd-gap-y': getGap({ side: 'top', attributes }),
						'--grd-gap-x': getGap({ side: 'left', attributes }),
						'--grd-rows': hasEqualRows ? '1fr' : 'auto',
						'--grd-aspect': aspect,
					},
				})}
			/>
		</div>
	);
};
export default GridBlockSave;
