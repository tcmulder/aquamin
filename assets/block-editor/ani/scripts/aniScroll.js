/**
 * Scroll-Based Animations
 *
 * Animate elements fluidly based on scroll position.
 *
 * Examples:
 *  aniScroll('.ani--parallax');
 *  // or
 *  aniScroll(document.querySelectorAll('.ani--parallax'));
 *  // or
 *  aniScroll([
 *      document.querySelector('.ani--parallax'),
 *      document.querySelector('.ani--parallax-alt')
 *  ]);
 *  // or (bases animation on window height rather than total element height)
 *  aniScroll('.ani--parallax', false);
 *
 * @param  {mixed}    mixed        Wrapper element (as selector string, nodelist, or array of nodes)
 * @param  {boolean}  useElHeight  Stretch animations over full element height (true/default) or just window height (false)
 */
export const aniScroll = (mixed, useElHeight = true) => {
	// identify scroll-based animation elements
	const isStr = typeof mixed === 'string';
	const scrollWraps = isStr ? document.querySelectorAll(mixed) : mixed;
	// bail if we have nothing
	if (!scrollWraps.length) return;

	// prep to store all scroll-based animation elements
	const scrollable = {};
	// prep to store all all currently animating elements
	const scrollers = {};

	// animate things based on scroll position
	const animate = () => {
		// if we have elements that should animate (i.e. they're in the viewport)
		const keys = Object.keys(scrollers);
		if (keys.length) {
			// animate each
			keys.forEach((key) => {
				const item = scrollers[key];
				const win = window.innerHeight;
				const { top, height } = item.getBoundingClientRect();
				const stretch = useElHeight ? height : 0;
				let per = (top + stretch) / (win + stretch);
				// don't go out of bounds (allow 0 min and 1 max)
				if (per < 0) {
					per = 0;
				} else if (per > 1) {
					per = 1;
				}
				scrollers[key].style.setProperty('--ani-plx', per);
			});
		}
	};

	// create an observer so we can animate elements only when in view
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				// get the ID of this entry
				const id = entry.target.dataset.aniScroll;
				// if in view add to currently animating and identify as shown
				if (entry.isIntersecting) {
					scrollers[id] = scrollable[id];
					scrollable[id].classList.add('is-shown');
					// if not in view remove shown and delete from currently animating
				} else {
					scrollable[id].classList.remove('is-shown');
					delete scrollers[id];
				}
			});
		},
		{ rootMargin: '10px 0px 10px' }
	);

	// controll scroll-based animations (throttled)
	let timer;
	window.addEventListener('scroll', () => {
		window.cancelAnimationFrame(timer);
		timer = window.requestAnimationFrame(animate);
	});

	// initialize animations
	scrollWraps.forEach((el, index) => {
		// create a unique id for this element
		const id = `el${index}`;
		el.dataset.aniScroll = id;
		// add this element to the list of scrollable things
		scrollable[id] = el;
		// add these to the observer so it can apply animations when they're in view
		observer.observe(el);
	});

	// trigger animations on initial script load
	animate();
	// reload on load to be certain image sizes e.g. are calculated
	window.addEventListener('load', animate);
	// reload on resize (debounced)
	let resizeTimer = null;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			animate();
		}, 300);
	});
};
