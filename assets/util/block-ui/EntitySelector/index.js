/**
 * Get entities list
 *
 * Handles creating a list of entities (posts, terms, etc)
 * and updates an array of unique ids.
 *
 * Usage:
 *
 *    <EntitySelector
 *        title={__('Posts', 'aquamin')}
 *        // getEntityRecords() call values
 *        entityRecordsQuery={[
 *            'postType', // or e.g. 'taxonomy'
 *            'post', // or e.g. 'category'
 *            // exclude this object entirely if you don't need it
 *            // @see https://developer.wordpress.org/rest-api/reference/pages/#arguments
 *            { include: '287' }
 *        ]}
 *        // how to find the title and ID from the entity's object
 *        parseEntities={(entity) => ({
 *            title: entity?.title?.raw, // e.g. 'taxonomy' instead returns entity?.name as title
 *            value: entity?.id,
 *        })}
 *        // current value
 *        value={ attributes.ids }
 *        // function to handle value updates
 *        onUpdate={(value) => setAttributes({ ids: value })}
 *    />
 */

import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { Spinner, Button } from '@wordpress/components';
import OrderChanger from './OrderChanger';
import PillsControl from './PillsControl';

const Render = ({
	entities,
	parseEntities,
	title,
	limit,
	chosen,
	updateAttributes,
	canReorder = true,
}) => {
	const [reorder, setReorder] = useState(false);
	if (entities === null) {
		return <Spinner />;
	}
	const opt = [
		...entities.map((t) => {
			return parseEntities(t);
		}),
	];
	return (
		<>
			{!canReorder || !reorder ? (
				<PillsControl
					label={title}
					limit={limit}
					chosen={chosen}
					suggestions={opt}
					updateAttributes={updateAttributes}
				/>
			) : (
				<OrderChanger
					chosen={chosen}
					opt={opt}
					updateAttributes={updateAttributes}
				/>
			)}
			{canReorder && (
				<Button
					variant="link"
					onClick={() => setReorder(!reorder)}
					style={{ marginBottom: '1rem' }}
					disabled={chosen.length < 2}
				>
					{reorder
						? __('Done Reordering', 'aquamin')
						: __('Reorder', 'aquamin')}
				</Button>
			)}
		</>
	);
};

const EntitySelector = compose(
	withSelect(
		(
			scopedSelect,
			{
				title,
				limit,
				value: chosen,
				onUpdate,
				entityRecordsQuery,
				parseEntities,
			},
		) => {
			// parse entity query
			const [kind, name, query = {}] = entityRecordsQuery;
			query.per_page = query?.per_page || 100; // FormTokenField supposedly supports 100 max

			// render
			const { getEntityRecords } = scopedSelect('core');
			return {
				entities: getEntityRecords(kind, name, query),
				parseEntities,
				title,
				limit,
				chosen,
				updateAttributes: (value) => onUpdate(value),
			};
		},
	),
)(Render);

export default EntitySelector;
