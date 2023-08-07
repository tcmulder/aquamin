/**
 * Grid Item editor interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';

const { __ } = wp.i18n;
const { useInnerBlocksProps } = wp.blockEditor;

/**
 * Generate block editor component
 */
const GridItemEdit = ({ attributes, setAttributes, className }) => {
	return (
		<div
			{...useInnerBlocksProps(
				{ className: classnames('grd__item', className) },
				{
					template: [['core/paragraph']],
				}
			)}
		/>
	);
};
export default GridItemEdit;
