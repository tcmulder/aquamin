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
 * @param {Object} props            Component props
 * @param {Object} props.attributes All block attributes
 */
const TemplateNamespaceBlockEdit = (props) => {
	const { attributes } = props;
	return (
		<ServerSideRender
			block="aquamin/template-slug"
			attributes={attributes}
		/>
	);
};
export default TemplateNamespaceBlockEdit;
