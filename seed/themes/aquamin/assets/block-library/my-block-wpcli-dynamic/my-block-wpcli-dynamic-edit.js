/**
 * My Block WP-CLI Dynamic editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Generate block editor component
 * @param {Object} props
 * @param {Object} props.attributes
 */
const MyBlockWPCLIDynamicBlockEdit = ({ attributes }) => {
	return (
		<ServerSideRender
			block="aquamin/my-block-wpcli-dynamic"
			attributes={attributes}
		/>
	);
};
export default MyBlockWPCLIDynamicBlockEdit;
