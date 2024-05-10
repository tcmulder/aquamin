/* eslint-disable no-console */
/**
 * My block Noninteractive front-end global JavaScript
 *
 * Defines front-end behavior. All theme.js files
 * like this one load globally on the front-end.
 */

import domReady from '@wordpress/dom-ready';
console.log(
	'Noninteractive block theme loads WordPress dependency:',
	typeof domReady === 'function',
);
import classnames from 'classnames';
console.log(
	'Noninteractive block theme loads node_modules dependency:',
	typeof classnames === 'function',
);
import fn from './custom-script';
console.log(
	'Noninteractive block theme loads internal dependency:',
	typeof fn === 'function',
);
fn();

domReady(() => {
	console.log('(the dom is ready)');
});
