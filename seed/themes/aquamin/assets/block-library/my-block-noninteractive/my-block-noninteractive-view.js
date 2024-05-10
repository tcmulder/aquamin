/* eslint-disable no-console */
/**
 * My Block Noninteractive front-end JavaScript
 *
 * Defines front-end behavior. All view.js files
 * like this one only load when enqueued manually
 * or via a block.json file.
 */
import domReady from '@wordpress/dom-ready';
console.log(
	'Noninteractive block loads WordPress dependency:',
	typeof domReady === 'function',
);
import classnames from 'classnames';
console.log(
	'Noninteractive block loads node_modules dependency:',
	typeof classnames === 'function',
);
import fn from './custom-script';
console.log(
	'Noninteractive block loads internal dependency:',
	typeof fn === 'function',
);
fn();
domReady(() => {
	console.log('(the dom is ready)');
});
