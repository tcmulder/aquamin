/* eslint-disable no-console */
/**
 * My Block JavaScript
 *
 * This file defines My Block
 * behavior.
 */
import { store, getContext } from '@wordpress/interactivity';
console.log(
	'Interactive block module loads Wordpress dependency:',
	typeof store === 'function',
);
import classnames from 'classnames';
console.log(
	'Interactive block module loads node_modules dependency:',
	typeof classnames === 'function',
);
import fn from './custom-script.mjs';
console.log(
	'Interactive block module loads internal dependency:',
	typeof fn === 'function',
);
fn();

const { state } = store('aquamin-my-block-interactive', {
	state: {
		likes: 0,
		getDoubleLikes() {
			return 2 * state.likes;
		},
	},
	actions: {
		toggle: () => {
			const context = getContext();
			context.isOpen = !context.isOpen;
		},
	},
	callbacks: {
		logIsOpen: () => {
			const context = getContext();
			// Log the value of `isOpen` each time it changes.
			console.log(`Is open: ${context.isOpen}`);
		},
	},
});
