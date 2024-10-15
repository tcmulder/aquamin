/**
 * Animation front-end global JavaScript
 *
 * Defines front-end behavior. All theme.js files
 * like this one load globally on the front-end..
 */

// import animations
import { ani, aniDelegate, aniLoad } from './ani-on-viewport/aniViewport';
import { aniScroll } from './ani-on-scroll/aniScroll';
import { aniBackground } from './ani-on-background/aniBackground';

// animate items once on page load
aniLoad('.ani--load');

// animate items on scroll (scrubs animation as you scroll)
aniScroll('.ani--parallax', true);

// animate background colors and media (like background-attachment:fixed)
aniBackground('.ani--background');

// animate foreground colors and media (like position:fixed popup)
aniBackground('.ani--foreground', true);

// (must come last as items above remove some extra .ani classes)
// animate items when they enter the viewport
ani([
	// delegate some animations (i.e. Gutenberg applies classes to parent and we'll move them to an appropriate child)
	...aniDelegate([
		{ parent: '.ani-parent.ani', child: '.ani-child' },
		// eslint-disable-next-line prettier/prettier
		{ parent: '.wp-block-cover.ani:not(.ani--parallax)', child: '.wp-block-cover__image-background' },
		{ parent: '.wp-block-columns.ani', child: '.wp-block-column' },
		{ parent: '.wp-block-buttons.ani', child: '.wp-block-button' },
	]),
	// must come second so aniDelegate can move .ani class to children and off of the parent
	...document.querySelectorAll('.ani'),
]);
