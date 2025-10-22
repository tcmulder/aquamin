/* eslint-disable no-console */
/**
 * My Component Interactive front-end global JavaScript
 *
 * Defines front-end behavior. All theme.js files
 * like this one load globally on the front-end.
 */

import { store, getContext } from '@wordpress/interactivity';
console.log(
	'Interactive block module theme loads Wordpress dependency:',
	typeof store === 'function' && typeof getContext === 'function',
);
import classnames from 'classnames';
console.log(
	'Interactive block module theme loads node_modules dependency:',
	typeof classnames === 'function',
);
import fn from './custom-script.mjs';
console.log(
	'Interactive block module theme loads internal dependency:',
	typeof fn === 'function',
);
fn();
