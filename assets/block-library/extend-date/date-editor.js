/**
 * Allow date block to show current year
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Identify the extension's name
 */
const EXTENSION_NAME = 'aquamin/current-year';

/**
 * Check if we're applying to this block
 */
const AFFECTED_BLOCKS = ['core/post-date'];
const isAffected = (name) => {
	return AFFECTED_BLOCKS.includes(name);
};

/**
 * Modify attributes
 * @param {Object} props Component props
 * @param {string} name  Block name
 */
const modifyAttributes = (props, name) => {
	// if we're supposed to edit this block
	if (isAffected(name)) {
		// add attributes to what already exists
		const attributes = {
			...props.attributes,
			aquaminClassNameCurrentYear: {
				type: 'boolean',
				default: false,
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
				attributes: { aquaminClassNameCurrentYear },
				setAttributes,
			} = props;

			// send the new control
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorControls group="settings">
						<PanelBody
							title={__('Auto-Update Year', 'aquamin')}
							initialOpen={true}
						>
							<ToggleControl
								label={__('Use current year', 'aquamin')}
								checked={aquaminClassNameCurrentYear}
								onChange={(val) =>
									setAttributes({
										aquaminClassNameCurrentYear: val,
									})
								}
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
 * Add attributes to editor
 */
const withShowModifyEdit = createHigherOrderComponent(
	// eslint-disable-next-line react/display-name
	(BlockListBlock) => (props) => {
		const {
			name,
			attributes: { className, aquaminClassNameCurrentYear },
		} = props;
		// if we're supposed to edit this block
		if (isAffected(name)) {
			return (
				<BlockListBlock
					{...props}
					className={classnames(
						className,
						aquaminClassNameCurrentYear ? 'current-year' : '',
					)}
				/>
			);
		}

		// everything's normal nothing to see here
		return <BlockListBlock {...props} />;
	},
	'withShowModifyEdit',
);

addFilter('editor.BlockListBlock', EXTENSION_NAME, withShowModifyEdit);
