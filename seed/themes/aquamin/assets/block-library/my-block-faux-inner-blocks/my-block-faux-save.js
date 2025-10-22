/**
 * My Block Faux save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Generate block HTML to save to the database
 */
const MyBlockFauxBlockSave = () => {
	return <InnerBlocks.Content />;
};
export default MyBlockFauxBlockSave;
