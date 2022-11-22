/**
 * My Block save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import dependencies
 */
const { InnerBlocks } = wp.blockEditor;

/**
 * Generate block HTML to save to the database
 */
const MyBlockBlockSave = () => {
	return <InnerBlocks.Content />;
};
export default MyBlockBlockSave;
