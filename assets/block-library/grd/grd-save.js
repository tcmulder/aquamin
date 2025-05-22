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
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getGap, getStyle, getStyleFromObject } from './grd-edit';

/**
 * Generate block HTML to save to the database
 * @param {Object} props            Component props
 * @param {Object} props.attributes All block attributes
 * @param {string} props.className  Block class name
 */
const GridBlockSave = ({ attributes, className }) => {
	const { count, hasEqualRows, minAspect } = attributes;
	const { x, y } = minAspect;
	const hasAspect = x && y;

	const blockProps = useBlockProps.save({
		className: classnames(
			'grd',
			hasAspect && 'grd--has-aspect',
			hasEqualRows && 'grd--has-equal-rows',
			'ani-parent',
			className,
		),
		style: {
			...getStyleFromObject('--grd-count', count),
			...getGap(attributes, 'top'),
			...getGap(attributes, 'left'),
			...getStyle('--grd-aspect', minAspect.x / minAspect.y),
		},
	});
	const innerBlocksProps = useInnerBlocksProps.save(blockProps, {
		template: Array(4).fill(['aquamin/grd-item']),
		allowedBlocks: ['aquamin/grd-item'],
		orientation: 'horizontal',
	});

	return <div {...innerBlocksProps}>{innerBlocksProps.children}</div>;
};
export default GridBlockSave;
