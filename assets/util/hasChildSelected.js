/**
 * Detect if a child block is selected
 *
 * This allows you to essentially check a block for .is-selected and
 * .has-child-selected (the CSS classes Gutenberg adds) in JavaScript
 * via isSelected (an existing block prop) and useHasChildSelected (this
 * custom hook).
 */

/**
 * Import dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Hook to check if a child block is selected
 *
 * This hook recursively checks all inner blocks of a given block to determine
 * if any of them are currently selected in the WordPress block editor.
 *
 * Remember, it's a React hook, so you'll need to call it in the root of the block and
 * store it as a variable you can use elsewhere in the component.
 *
 * @param {string} clientId The client ID of the parent block to check.
 * @return {boolean}        True if any descendant block is selected, false otherwise.
 */
export const useHasChildSelected = (clientId) => {
	return useSelect(
		(select) => {
			const { getBlock, getSelectedBlockClientId } =
				select('core/block-editor');
			const selectedClientId = getSelectedBlockClientId();

			/**
			 * Recursively checks if the selected block is a descendant of the given block
			 *
			 * @param {Object} block The block to check for descendants.
			 * @return {boolean} True if a descendant is selected, false otherwise.
			 */
			const isDescendantSelected = (block) => {
				if (!block || !block.innerBlocks) {
					return false;
				}
				return block.innerBlocks.some((inner) => {
					if (inner.clientId === selectedClientId) {
						return true;
					}
					return isDescendantSelected(inner);
				});
			};

			const block = getBlock(clientId);
			return isDescendantSelected(block);
		},
		[clientId],
	);
};

export default useHasChildSelected;
