/**
 * Grid Item variations
 *
 * This splits the block into several
 * variations.
 */

import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockVariation('aquamin/grd-item', [
	{
		name: 'aquamin-grd-item-default',
		title: __('Grid Cell', 'aquamin'),
		description: __('Freeform grid cell content.', 'aquamin'),
		isDefault: true,
		attributes: { variation: 'cell' },
		isActive: (a, b) => a.variation === b.variation,
	},
	{
		name: 'aquamin-grd-item-image',
		title: __('Grid Cell Image', 'aquamin'),
		description: __('Image within a grid cell.', 'aquamin'),
		attributes: { variation: 'image' },
		innerBlocks: [['core/image']],
		isActive: (a, b) => a.variation === b.variation,
	},
	{
		name: 'aquamin-grd-item-video',
		title: __('Grid Cell Video', 'aquamin'),
		description: __('Video within a grid cell.', 'aquamin'),
		attributes: { variation: 'video' },
		innerBlocks: [['core/video']],
		isActive: (a, b) => a.variation === b.variation,
	},
]);
