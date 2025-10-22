/**
 * Query post core/query variation
 *
 * Query inner blocks as if on another post; for example,
 * from one post, query the title and featured image from a
 * different post by ID.
 */
/**
 * Import dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import Icon from './icon.inline.svg';
import { PanelBody } from '@wordpress/components';
import EntitySelector from '../../util/block-ui/EntitySelector';

/**
 * Setup variation
 */
const variationName = 'aquamin/query-post';
const isVariation = ({ namespace }) => {
	return namespace === variationName;
};

registerBlockVariation('core/query', {
	name: variationName,
	title: __('My Block Entity Selector', 'aquamin'),
	description: __('The My Block Entity Selector Block.', 'aquamin'),
	icon: Icon,
	isActive: (attributes) => isVariation(attributes),
	attributes: {
		namespace: variationName,
		query: {
			perPage: 2,
			postType: 'post',
			order: 'asc',
			aquaminPostIn: [],
		},
	},
	scope: ['inserter'],
	innerBlocks: [['core/post-template', {}, [['core/post-title']]]],
	allowedControls: [],
});

export const withQueryControls = (BlockEdit) => (props) => {
	const { attributes, setAttributes } = props;

	if (!isVariation(attributes)) {
		return <BlockEdit key="edit" {...props} />;
	}

	return (
		<>
			<BlockEdit key="edit" {...props} />
			<InspectorControls>
				<PanelBody title={__('Entity Selector Block', 'aquamin')}>
					<EntitySelector
						title={__('Select entity', 'aquamin')}
						entityRecordsQuery={[
							'postType',
							attributes.query.postType,
						]}
						parseEntities={(entity) => ({
							title: entity?.title?.raw,
							value: entity?.id,
						})}
						onUpdate={(value) =>
							setAttributes({
								query: {
									...attributes.query,
									aquaminPostIn: value,
								},
							})
						}
						value={attributes?.query?.aquaminPostIn}
						limit={2}
						canReorder={true}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

addFilter('editor.BlockEdit', 'core/query', withQueryControls);
