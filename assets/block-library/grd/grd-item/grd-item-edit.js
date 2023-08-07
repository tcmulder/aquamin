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
const { useBlockProps, InnerBlocks, RichText } = wp.blockEditor;

/**
 * Generate block editor component
 */
const GridItemEdit = ({ attributes, setAttributes, className }) => {
	const { demoText } = attributes;

	return (
		<div
			{...useBlockProps({
				className: classnames('grd__item', className),
			})}
		>
			[item]
			{/* <InnerBlocks template={[['core/paragraph']]} /> */}
		</div>
	);
};
export default GridItemEdit;
