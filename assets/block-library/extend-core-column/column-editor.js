/**
 * Customize column
 *
 * Add customizations to column blocks (i.e. the thing inside columns).
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { FormTokenField, PanelBody } from '@wordpress/components';
import extractClasses from '../../util/extractClasses';

/**
 * Identify the extension's name
 */
const EXTENSION_NAME = 'aquamin/column';

/**
 * Check if we're applying to this block
 */
const AFFECTED_BLOCKS = ['core/column'];
const isAffected = (name) => {
	return AFFECTED_BLOCKS.includes(name);
};

/**
 * Modify attributes
 * @param {Object} props Component props.
 * @param {string} name  Block name.
 */
const modifyAttributes = (props, name) => {
	// if we're supposed to edit this block
	if (isAffected(name)) {
		// add attributes to what already exists
		const attributes = {
			...props.attributes,
			aquaminClassNameColumn: {
				type: 'array',
				default: [],
			},
		};

		// return everything
		return { ...props, attributes };
	}

	// everything's normal nothing to see here
	return props;
};

addFilter('blocks.registerBlockType', EXTENSION_NAME, modifyAttributes);

/**
 * Modify editor controls
 */
const withModifyEdit = createHigherOrderComponent(
	// eslint-disable-next-line react/display-name, arrow-body-style
	(BlockEdit) => (props) => {
		const { name } = props;
		// if we're supposed to edit this block
		if (isAffected(name)) {
			// grab the props we're interested in
			const {
				attributes: { aquaminClassNameColumn },
				setAttributes,
			} = props;

			// define classes
			const classNames = [
				{ value: 'is-first-md', title: 'Order first on tablets' },
				{ value: 'is-full-md', title: 'Full width on tablets' },
			];

			// set up fake array of strings to mimic actual attribute objects
			const [selectedStrings, setSelectedStrings] = useState(
				[...aquaminClassNameColumn].map((pair) => {
					return pair.title;
				}),
			);

			// handle updates to tokens
			const handleChange = (tokens) => {
				// set fake string-based state
				setSelectedStrings(tokens);
				// update actual attributes
				const newAttributes = [];
				tokens.forEach((str) => {
					const match = classNames.find((obj) => {
						return obj.title === str;
					});
					if (match) {
						newAttributes.push(match);
					}
				});
				setAttributes({ aquaminClassNameColumn: newAttributes });
			};

			// send the new control
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorControls group="styles">
						<PanelBody title={__('Column Styling', 'aquamin')}>
							<FormTokenField
								value={selectedStrings}
								label={__('For this column:', 'aquamin')}
								suggestions={classNames.map((opt) => {
									return opt.title;
								})}
								onChange={handleChange}
								__experimentalExpandOnFocus
								expandOnFocus
								__experimentalShowHowTo={false}
								showHowTo={false}
							/>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		}

		// everything's normal nothing to see here
		return <BlockEdit {...props} />;
	},
	'withModifyEdit',
);

addFilter('editor.BlockEdit', EXTENSION_NAME, withModifyEdit);

/**
 * Save attributes
 * @param {Object} props      Component props.
 * @param {Object} block      Block object.
 * @param {Object} attributes All block attributes.
 */
const modifySave = (props, block, attributes) => {
	const { name } = block;
	// if we're supposed to edit this block
	if (isAffected(name)) {
		// add the spacing to the block wrap
		if (attributes.aquaminClassNameColumn) {
			return {
				...props,
				className: classnames(
					props.className,
					attributes.aquaminClassNameColumn.map((opt) => {
						return opt.value;
					}),
				),
			};
		}
	}

	// everything's normal nothing to see here
	return props;
};

addFilter('blocks.getSaveContent.extraProps', EXTENSION_NAME, modifySave);

/**
 * Add attributes to editor
 */
const withShowModifyEdit = createHigherOrderComponent(
	// eslint-disable-next-line react/display-name
	(BlockListBlock) => (props) => {
		const { name, attributes } = props;
		// if we're supposed to edit this block
		if (isAffected(name)) {
			return (
				<BlockListBlock
					{...props}
					className={classnames(extractClasses(attributes))}
				/>
			);
		}

		// everything's normal nothing to see here
		return <BlockListBlock {...props} />;
	},
	'withShowModifyEdit',
);

addFilter('editor.BlockListBlock', EXTENSION_NAME, withShowModifyEdit);
