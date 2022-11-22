/**
 * My Block editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
const ServerSideRender = wp.serverSideRender;

/**
 * Generate block editor component
 */
const MyBlockBlockEdit = ({ attributes }) => {
	return (
		<ServerSideRender
			block="aquamin/my-block"
			attributes={attributes}
		/>
	);
};
export default MyBlockBlockEdit;
