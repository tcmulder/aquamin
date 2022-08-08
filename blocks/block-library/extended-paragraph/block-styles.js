/**
 * Paragraph block styles
 */
const { domReady } = wp;
const { registerBlockStyle } = wp.blocks;

domReady(() => {
	registerBlockStyle('core/paragraph', {
		name: 'inline',
		label: 'Inline',
	});
});
