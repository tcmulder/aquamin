/**
 * Viewport-Based Animations
 *
 * Run an animation on elements once they enter the viewport.
 *
 * @param {nodelist}} els Elements to which we'll attach animations
 */
export const ani = (els) => {
	// if we have elements
	if (els.length) {
		// set up an observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// toggle .is-shown based on visibility in viewport
					entry.target.classList.toggle(
						'is-shown',
						entry.isIntersecting
					);
				});
			},
			{ rootMargin: '10px 0px 0px' }
		);
		// add all elements to the observer
		els.forEach((el) => {
			observer.observe(el);
		});
	}
};

/**
 * Delegate Animations
 *
 * Apply animation classes to children of
 * elements rather than their parents, with
 * incremental delays. (You'll then need to
 * send the returned elements through ani()
 * to apply the animations.)
 *
 * @param {array} delegatedSelectors Array of parent/child selector pairs.
 * @param {string} aniClassName  Name of basic animations (what ani() will use)
 * @returns {nodelist} Elements to which we should apply animations.
 */
export const aniDelegate = (delegatedSelectors, aniClassName = 'ani') => {
	const allAniEls = [];

	// for every parent/child pair
	delegatedSelectors.forEach(
		({ parent: parentSelector, child: childSelector }) => {
			// for every parent element
			document.querySelectorAll(parentSelector)?.forEach((parentEl) => {
				// get all the children we're to delegate to
				const childEls = parentEl.querySelectorAll(childSelector);
				// if we have children to delegate to
				if (childEls.length) {
					// get the parent's ani classes
					const aniClassNames = [
						aniClassName,
						...[...parentEl.classList].filter(
							(className) =>
								className.substr(0, 5) === `${aniClassName}--`
						),
					];
					// for every child we're delegating to
					childEls?.forEach((childEl, i) => {
						// add ani classes
						childEl.classList.add(...aniClassNames);
						// stagger animations slightly
						childEl.style.setProperty('--ani-delay-increment', i);
						// add this child to the animation list
						allAniEls.push(childEl);
					});
					// remove ani classes from the parent
					parentEl.classList.remove(...aniClassNames);
				} else if (parentEl.classList.contains(aniClassName)) {
					// add parent to animation list (if has ani class and no delegates)
					allAniEls.push(parentEl);
				}
			});
		}
	);
	return allAniEls;
};

/**
 * On-Load Animations
 *
 * Run animations once on document ready
 * and never again.
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
