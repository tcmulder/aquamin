/**
 * Ani JavaScript
 *
 * This file defines behaviors of
 * ani blocks.
 */

// import animations
import { aniLoad } from './scripts/aniLoad';
import { aniScroll } from './scripts/aniScroll';
import { aniBackground } from './scripts/aniBackground';
import { ani, aniDelegate } from './scripts/aniViewport';

// execute animations
aniLoad('.ani--load');
aniScroll({
	parent: '.ani--parallax',
	child: '.wp-block-cover__video-background, .wp-block-cover__image-background',
});
aniBackground('.ani--background');
aniBackground('.ani--foreground', true);
ani([
	...aniDelegate([
		{ parent: '.ani-parent', child: '.ani-child' },
		// eslint-disable-next-line prettier/prettier
		{ parent: '.wp-block-cover', child: '.wp-block-cover__image-background' },
		{ parent: '.wp-block-columns', child: '.wp-block-column' },
		{ parent: '.wp-block-buttons', child: '.wp-block-button' },
	]),
	...document.querySelectorAll('.ani'),
]);
