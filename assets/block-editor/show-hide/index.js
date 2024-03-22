/**
 * Allow hide/show of content responsively
 *
 * Allows the blocks herein to be shown/hidden
 * responsively (use sparingly...)
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
import { PanelBody, ButtonGroup, Button, Icon } from '@wordpress/components';
import extractClasses from '../../util/extractClasses';

/**
 * Identify the extension's name
 */
const EXTENSION_NAME = 'aquamin/hide';

/**
 * Check if we're applying to this block
 */
const AFFECTED_BLOCKS = [
	'core/group',
	'core/column',
	'core/image',
	'core/video',
	'aquamin/grd-item',
];
const isAffected = (name) => {
	return AFFECTED_BLOCKS.includes(name);
};

/**
 * Modify attributes
 */
const modifyAttributes = (props, name) => {
	// if we're supposed to edit this block
	if (isAffected(name)) {
		// add attributes to what already exists
		const attributes = {
			...props.attributes,
			aquaminClassNameHide: {
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
				attributes: { aquaminClassNameHide },
				setAttributes,
			} = props;

			// define classes
			const classNames = [
				{ value: 'hide-bp-sm', title: 'Phone', icon: 'smartphone' },
				{ value: 'hide-bp-md', title: 'Tablet', icon: 'tablet' },
				{ value: 'hide-bp-lg', title: 'Laptop', icon: 'laptop' },
				{ value: 'hide-bp-md-up', title: 'Desktop+', icon: 'desktop' },
			];

			// send the new control
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorControls group="styles">
						<PanelBody
							title={__('Responsive Visibility', 'aquamin')}
							initialOpen={false}
						>
							<ButtonGroup>
								{classNames.map((opt, i) => (
									<Button
										key={i}
										label={opt.title}
										icon={<Icon icon={opt.icon} />}
										onClick={() => {
											const newAttributes = [
												...aquaminClassNameHide,
											];
											const index =
												newAttributes.findIndex(
													(item) =>
														item.value === opt.value
												);
											if (index === -1) {
												newAttributes.push({
													value: opt.value,
												});
											} else {
												newAttributes.splice(index, 1);
											}
											setAttributes({
												aquaminClassNameHide:
													newAttributes,
											});
										}}
										isPressed={
											!aquaminClassNameHide.find(
												(item) =>
													item.value === opt.value
											)
										}
									/>
								))}
							</ButtonGroup>
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
		if (attributes.aquaminClassNameHide) {
			return {
				...props,
				className: classnames(
					props.className,
					attributes.aquaminClassNameHide.map((opt) => {
						return opt.value;
					})
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
