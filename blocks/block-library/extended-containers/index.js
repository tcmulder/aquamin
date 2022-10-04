/**
 * Customize containers
 *
 * Add customizations to container blocks
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';

import extractClasses from '../../util/exctract-classes';

const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment, useState } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { FormTokenField, PanelBody } = wp.components;

/**
 * Identify the extension's name
 */
const EXTENSION_NAME = 'aquamin/containers';

/**
 * Check if we're applying to this block
 */
const AFFECTED_BLOCKS = ['core/group'];
const isAffected = (name) => AFFECTED_BLOCKS.includes(name);

/**
 * Modify attributes
 */
const modifyAttributes = (props, name) => {
	// if we're supposed to edit this block
	if (isAffected(name)) {
		// add attributes to what already exists
		const attributes = {
			...props.attributes,
			aquaminClassNameContainer: {
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
	// eslint-disable-next-line react/display-name
	(BlockEdit) => (props) => {
		const { name } = props;
		// if we're supposed to edit this block
		if (isAffected(name)) {
			// grab the props we're interested in
			const {
				attributes: { aquaminClassNameContainer },
				setAttributes,
			} = props;

			// define classes
			const classNames = [
				{
					value: 'is-style-no-gutters',
					title: __('Remove side gutters'),
				},
			];

			// set up fake array of strings to mimic actual attribute objects
			const [selectedStrings, setSelectedStrings] = useState(
				[...aquaminClassNameContainer].map((pair) => pair.title)
			);

			// handle updates to tokens
			const handleChange = (tokens) => {
				// set fake string-based state
				setSelectedStrings(tokens);
				// update actual attributes
				const newAttributes = [];
				tokens.forEach((str) => {
					const match = classNames.find((obj) => obj.title === str);
					if (match) {
						newAttributes.push(match);
					}
				});
				setAttributes({ aquaminClassNameContainer: newAttributes });
			};

			// send the new control
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody title={__('Container Options', 'aquamin')}>
							<FormTokenField
								value={selectedStrings}
								label={__('Options:', 'aquamin')}
								suggestions={classNames.map((opt) => opt.title)}
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
	'withModifyEdit'
);

addFilter('editor.BlockEdit', EXTENSION_NAME, withModifyEdit);

/**
 * Save attributes
 */
const modifySave = (props, block, attributes) => {
	const { name } = block;
	// if we're supposed to edit this block
	if (isAffected(name)) {
		// add the spacing to the block wrap
		if (attributes.aquaminClassNameContainer) {
			return {
				...props,
				className: classnames(
					props.className,
					attributes.aquaminClassNameContainer.map((opt) => opt.value)
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
	'withShowModifyEdit'
);

addFilter('editor.BlockListBlock', EXTENSION_NAME, withShowModifyEdit);
