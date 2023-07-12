/**
 * On-Load Animations
 *
 * @param {mixed} element Selector string, nodelist, or array of nodes.
 * @param {array} aniClassNameList Class names for animations (so we can remove it)
 */
export const aniLoad = (element, aniClassNameList = ['ani']) => {
	const els =
		typeof element === 'string'
			? document.querySelectorAll(element)
			: element;
	if (els.length) {
		els.forEach((el) => {
			// remove other animation types (like viewport-based animations)
			el.classList.remove(...aniClassNameList);
			// if this is a loadable media element
			if (el.complete !== undefined) {
				if (el.complete) {
					// show the element after a bit if it's already cached
					setTimeout(() => {
						el.classList.add('is-shown');
					}, 100);
				} else {
					// show the element after it loads for the first time
					el.addEventListener('load', () => {
						el.classList.add('is-shown');
					});
				}
			} else if (
				['interactive', 'complete'].includes(document.readyState)
			) {
				// show the element if the page is already ready
				el.classList.add('is-shown');
			} else {
				// show the element on page ready
				document.addEventListener(
					'DOMContentLoaded',
					() => el.classList.add('is-shown'),
					false
				);
			}
		});
	}
};
