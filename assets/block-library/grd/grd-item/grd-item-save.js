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
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getStyle, getStyleFromObject } from '../grd-edit';

/**
 * Generate block HTML to save to the database
 * @param {Object} props            Component props.
 * @param {Object} props.attributes All block attributes.
 * @param {string} props.className  Block class name.
 */
const GridItemSave = (props) => {
	const { attributes, className } = props;
	const { span, col, row, spanRow, vAlign, variation } = attributes;

	const blockProps = useBlockProps.save({
		className: classnames(
			'grd__item',
			variation !== 'cell' && `grd__item--${variation}`,
			'ani-child',
			className,
		),
		style: {
			...getStyleFromObject('--grd-span', span, (val) => val > 1),
			...getStyle('--grd-v-align', vAlign, (val) => val !== 'stretch'),
			...getStyleFromObject('--grd-col', col),
			...getStyleFromObject('--grd-row', row),
			...getStyleFromObject('--grd-span-row', spanRow),
		},
	});
	const innerBlocksProps = useInnerBlocksProps.save(
		{ ...blockProps },
		{ template: [['core/paragraph']] },
	);

	return (
		<div {...innerBlocksProps}>
			<div className="grd__frame">{innerBlocksProps.children}</div>
		</div>
	);
};

export default GridItemSave;
