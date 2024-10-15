/**
 * Button block styles
 */
import domReady from '@wordpress/dom-ready';
import { unregisterBlockStyle, registerBlockStyle } from '@wordpress/blocks';

domReady(() => {
	registerBlockStyle('core/button', {
		name: 'dark',
		label: 'Dark',
		isDefault: true,
	});
	registerBlockStyle('core/button', {
		name: 'light',
		label: 'Light',
	});
	unregisterBlockStyle('core/button', 'fill');
	unregisterBlockStyle('core/button', 'outline');
});
