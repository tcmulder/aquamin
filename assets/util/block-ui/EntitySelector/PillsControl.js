/**
 * Add functional version of WP's FormTokenField control.
 *
 * Usage:
 *
 *    <PillsControl
 *        label={__('Some title', 'aquamin')}
 *        limit={2}
 *        chosen={chosenArray} // e.g. [{title: 'Title', value: 123}]
 *        suggestions={someOptionsArray} // e.g. [{title: 'Title', value: 123}, {title: 'Title 2', value: 246}]
 *        updateAttributes={parentsSetAttributesCall} // e.g. ()=>setAttribute({postIds: chosenArray.filter((val)=>val.id)})
 *    />
 */

import { useState } from '@wordpress/element';
import { FormTokenField } from '@wordpress/components';

const PillsControl = ({
	label,
	limit,
	chosen,
	suggestions,
	updateAttributes,
}) => {
	// set up fake array of strings to mimic actual attribute objects
	const [selectedStrings, setSelectedStrings] = useState([
		...chosen
			.map((id) => {
				return suggestions.find((pair) => {
					return pair?.value === id;
				})?.title;
			})
			// filter to only available options (i.e. get rid of trashed posts)
			.filter((val) => !!val),
	]);

	// handle updates to tokens
	const handleChange = (tokens) => {
		// set fake string-based state
		setSelectedStrings(tokens);
		// determine ids from suggestions
		const matchingIds = tokens.map((title) => {
			return suggestions.find((pair) => pair.title === title).value;
		});
		updateAttributes(matchingIds);
	};

	// validate input
	const validate = (value) => {
		return !!suggestions.find((entity) => entity.title === value);
	};

	return (
		<FormTokenField
			label={label}
			value={selectedStrings}
			suggestions={
				!limit || selectedStrings.length < limit
					? suggestions.map((opt) => opt.title)
					: []
			}
			onChange={handleChange}
			__experimentalExpandOnFocus
			expandOnFocus
			__experimentalShowHowTo={false}
			showHowTo={false}
			__experimentalValidateInput={(value) => validate(value)}
			validateInput={(value) => validate(value)}
		/>
	);
};

export default PillsControl;
