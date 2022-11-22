/**
 * Background Animations
 *
 * Full-screen, fixed-position background animations.
 *
 * @param {mixed} element Selector string, nodelist, or array of nodes.
 * @param {boolean} isPopupStyle Whether to block adjacent content like a popup on active.
 */
export const aniBackground = (element, isPopupStyle = false) => {
	const els =
		typeof element === 'string'
			? document.querySelectorAll(element)
			: element;
	if (els.length) {
		// watch intersection
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// if the element is shown
					const el = entry.target;
					if (entry.isIntersecting) {
						el.classList.add('is-shown-bg');
						if (el?.classTransfers) {
							el.classTransfers.forEach((className) => {
								el.fixedBackground.classList.add(className);
								el.classList.add(className);
							});
						}
						el.fixedBackground.classList.add('active');
					}
					// if the element is hidden
					else {
						el.classList.remove('is-shown-bg');
						el.fixedBackground.classList.remove('active');
						el.classList.remove(el.colorClassName);
					}
				});
			},
			{ rootMargin: '-50% 0% -50%' }
		);

		// loop through our elements
		const torsoEl = document.querySelector('.torso');
		els.forEach((el) => {
			// create the background feature and add it to the body (behind everything else)
			const fixedBackground = document.createElement('i');
			fixedBackground.setAttribute('aria-hidden', true);
			fixedBackground.classList.add(
				'background-color-block',
				`background-color-block--${
					isPopupStyle ? 'foreground' : 'background'
				}`
			);
			const coverEls = el.querySelectorAll(
				'.wp-block-cover__gradient-background, .wp-block-cover__video-background, .wp-block-cover__image-background, .wp-block-cover__background'
			);
			if (coverEls.length) {
				fixedBackground.classList.add('wp-block-cover');
				coverEls.forEach((childEl) =>
					fixedBackground.appendChild(childEl)
				);
			}
			torsoEl.appendChild(fixedBackground);
			el.fixedBackground = fixedBackground;
			// determine what classes to add/remove
			const classNames = [...el.classList];
			const classTransfers = classNames.filter(
				(className) =>
					/^has-.*-background-color$/.test(className) ||
					/^is-style-.*$/.test(className)
			);
			if (classTransfers.length) {
				el.classTransfers = classTransfers;
			}
			// wait to remove background till things are loaded
			if (el.tagName.toLowerCase() === 'header') {
				onReady(() => {
					// wait till bg animations finish
					setTimeout(() => {
						el.classList.add('is-loaded');
					}, 1000);
				});
			}

			// attach the observer to the animated elements
			observer.observe(el);
		});
	}
};
