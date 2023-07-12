/**
 * Scroll-Based Animations
 *
 * Animate elements fluidly based on scroll position.
 *
 * @param {object} props Properties.
 * @param {mixed} parent Selector string, nodelist, or array of nodes.
 * @param {string} props.child Selector string.
 */
export const aniScroll = ({ parent: parentMixed, child: childSelector }) => {
	// identify scroll-based animation elements
	const scrollEls =
		typeof parentMixed === 'string'
			? document.querySelectorAll(parentMixed)
			: parentMixed;
	// bail if we have nothing
	if (!scrollEls.length) {
		return;
	}

	// store all scroll-based animation elements
	const scrollable = {};
	// store all all currently animated scroll-based animation elements
	const scrollers = {};

	// set up animation
	const animate = () => {
		// if we have elements that should animate (i.e. they're in the viewport)
		const keys = Object.keys(scrollers);
		if (keys.length) {
			// animate each
			keys.forEach((key) => {
				const item = scrollers[key];
				const win = window.innerHeight;
				const rect = item.el.getBoundingClientRect();
				const { top, height } = rect;
				const per = (top + height) / (win + height);
				// const easeOut = factor * (per * 1.25) ** 7;
				let newValue = item.value;
				item.nums.forEach((num) => {
					newValue = newValue.replace(/\{.*?\}/, per * num);
				});
				item.subEl.style[item.property] = newValue;
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
					scrollable[id].el.classList.add('is-shown');
					// if not in view remove shown and delete from currently animating
				} else {
					scrollable[id].el.classList.remove('is-shown');
					delete scrollers[id];
				}
			});
			// trigger when almost in/out view
		},
		{ rootMargin: '10px 0px 10px' }
	);

	// controll scroll-based animations
	let timeout;
	window.addEventListener('scroll', () => {
		// throttle by request animation keyframe for performance
		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}
		timeout = window.requestAnimationFrame(() => {
			animate();
		});
	});

	// setup animations
	scrollEls.forEach((el, index) => {
		// identify this as the parallax parent
		el.classList.add('ani-parallax-parent');
		// create a unique id for this element
		const id = `el${index}`;
		el.dataset.aniScroll = id;
		// get the sub element
		const subEl = el.querySelector(childSelector);
		// define properties to animat
		let property = el.dataset.scrollProperty;
		let value = el.dataset.scrollValue;
		// maybe set default properties
		if (!el.dataset.scrollProperty) {
			subEl.classList.add('ani--parallax-default');
			const parallaxAmount = parseInt(
				getComputedStyle(subEl).getPropertyValue('--parallax-size')
			);
			property = 'transform';
			value = `translate3d(0px, {${parallaxAmount * -1}}vh, 0px)`;
		}
		// parse animation
		const numStrArr = value ? value.match(/[^{\}]+(?=})/g) : [];
		const nums = numStrArr.map((num) => parseFloat(num));
		// set up this scrollable element
		scrollable[id] = {
			// the element itself
			el,
			// the element withing receiving animation
			// (note: this nesting allows intersection observer to monitor an unmoving
			// element, while animations are applied to the sub element instead.)
			subEl,
			// the properties/values to animate
			property,
			value,
			nums,
		};

		// add these to the observer so it can apply animations when they're in view
		observer.observe(el);
	});

	// trigger animations on initial script load (and re-check on load event)
	if (scrollEls) {
		animate();
		window.onload = () => animate();
	}
};
