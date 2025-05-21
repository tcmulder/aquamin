/* eslint-disable no-console */
/**
 * My Component File Extensions front-end global JavaScript
 *
 * Defines front-end behavior. All theme.js files
 * like this one load globally on the front-end.
 */
import { __ } from '@wordpress/i18n';

['css', 'scss'].forEach((ext) => {
	const el = document.createElement('div');
	el.classList.add(`my-component-tile-extensions-${ext}`);
	document.body.appendChild(el);
	const { content } = getComputedStyle(el, ':before');
	if (content === `".${ext} ${__('files compile', 'aquamin')}"`) {
		console.log(`.${ext} ${__('files compile', 'aquamin')}:`, true);
	}
});
