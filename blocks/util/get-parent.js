/**
 * Find Parent Element
 *
 * Search for a parent element by selector name, or return null.
 *
 * @param {HTMLnode} el Child element
 * @param {string} sel Parent element selector to search for
 * @returns Parent HTMLnode, or null if not found
 */
const parent = (el, sel) => {
	if (el) {
		let parentEl = el.parentNode;
		do {
			if (parentEl.matches(sel)) {
				return parentEl;
			}
			parentEl = parentEl.parentNode;
		} while (parentEl.nodeType === 1);
	}
	return null;
};
export default parent;
