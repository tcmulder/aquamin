/**
 * template-title editor interface
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
const TemplateNamespaceBlockEdit = ({ attributes }) => {
	return (
		<ServerSideRender
			block="aquamin/template-slug"
			attributes={attributes}
		/>
	);
};
export default TemplateNamespaceBlockEdit;
