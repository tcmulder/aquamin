/**
 * Current Year editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';

const { useBlockProps } = wp.blockEditor;

/**
 * Generate block editor component
 */
const YearBlockEdit = ({ className }) => {
	const year = new Date().getFullYear();

	return (
		<span
			{...useBlockProps({
				className: classnames('year', className),
			})}
		>
			{year}
		</span>
	);
};
export default YearBlockEdit;
