/**
 * My Dynamic Block editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
const ServerSideRender = wp.serverSideRender;

/**
 * Generate block editor component
 */
const MyDynamicBlockBlockEdit = ({ attributes }) => {
	return (
		<ServerSideRender
			block="aquamin/my-dynamic-block"
			attributes={attributes}
		/>
	);
};
export default MyDynamicBlockBlockEdit;
