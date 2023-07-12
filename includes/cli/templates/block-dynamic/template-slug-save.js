/**
 * template-title save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
const { InnerBlocks } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const TemplateNamespaceBlockSave = () => {
	return <InnerBlocks.Content />;
};
export default TemplateNamespaceBlockSave;
