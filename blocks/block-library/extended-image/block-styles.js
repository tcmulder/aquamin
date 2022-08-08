/**
 * Image block styles
 */
const { domReady } = wp;
const { unregisterBlockStyle } = wp.blocks;

domReady(() => {
	unregisterBlockStyle('core/image', 'rounded');
});
