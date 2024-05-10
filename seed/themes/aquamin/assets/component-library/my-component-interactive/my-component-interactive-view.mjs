/* eslint-disable no-console */
/**
 * My Component Interactive component front-end JavaScript
 *
 * Defines front-end behavior. All view.js files
 * like this one only load when enqueued manually
 * or via a block.json file.
 */
import { store, getContext } from '@wordpress/interactivity';
console.log(
	'Interactive component module view loads Wordpress dependency:',
	typeof store === 'function',
);
import classnames from 'classnames';
console.log(
	'Interactive component module view loads node_modules dependency:',
	typeof classnames === 'function',
);
import fn from './custom-script.js';
console.log(
	'Interactive component module view loads internal dependency:',
	typeof fn === 'function',
);
fn();

const { state } = store('aquamin-my-component-interactive', {
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
			console.log(`Is open Comp: ${context.isOpen}`);
		},
	},
});
