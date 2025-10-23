/**
 * Simply add classes to blocks
 *
 * Creates Gutenberg controls for adding classes
 * to blocks, simply and easily.
 * 
 * @version 1.0.1
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useState, cloneElement } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { FormTokenField, PanelBody } from '@wordpress/components';

/**
 * Setup simple class UI
 *
 * You can call this in any block's index.js file
 * (or any other file called within the block editor)
 * to add custom class options to a block.
 * 
 * Note that if you're using this for a dynamic block, you'll need
 * to add the appropriate attribute to it (e.g. if the slug is
 * aquamin/my-classes then add an attribute aquaminClassNameAquaminMyClasses)
 *
 * @example Example called in a block's index.js with minimal options.
 * classNameUI({
 *   title: __('My Special Classes', 'aquamin'),
 *   slug: 'aquamin/my-special-classes',
 *   affectedBlocks: [block.name],
 *   classNames: [
 *     { value: 'is-class-1', title: 'Class 1' },
 *     { value: 'is-class-2', title: 'Class 2' },
 *   ],
 * });
 *
 * @example Complex example called in an editor.js file to extend core blocks.
 * classNameUI({
 *   title: __('My Special Classes', 'aquamin'),
 *   slug: 'aquamin/my-special-classes',
 *   controlProps: { label: __('Select Classes', 'aquamin') },
 *   affectedBlocks: ['core/group', 'core/columns'],
 *   group: 'settings',
 *   wrap: <div style={{ gridColumn: '1 / -1' }}></div>,
 *   show: ({ attributes }) => !attributes.hideCustomControls,
 *   multiple: false,
 *   classNames: [
 *     { value: 'is-class-1', title: 'Class 1' },
 *     { value: 'is-class-2', title: 'Class 2' },
 *   ],
 * });
 *
 * @param {Object}    props                  Props
 * @param {Array}     props.affectedBlocks   Array of block slugs like ['core/group', 'core/columns']
 * @param {Array}     props.classNames       Array of classes like [{value:'my-class',title:'Class 1'},{value:'my-class-2',title:'Class 2'}]
 * @param {Object}    [props.controlProps]   Optional customizations to the control's props like {label:'Choose class'}
 * @param {string}    [props.group='styles'] Group within <InspectorControls /> in which to display the controls
 * @param {boolean}   [props.multiple=true]  Whether or not to allow multiple class selections
 * @param {Function}  [props.show=()=>true]  Function to determine whether or not to show the control
 * @param {string}    props.slug             Slug like "aquamin/my-extra-classes"
 * @param {string}    props.title            Human-readable title for the control's container
 * @param {Component} [props.wrap]           Optional custom component to wrap the control
 */
export const classNameUI = ({
	title,
	slug,
	affectedBlocks,
	classNames,
	controlProps,
	group = 'styles',
	wrap = null,
	multiple = true,
	show = () => true,
}) => {
	/**
	 * Setup variables
	 */
	const varName = getAttributeSlug(slug);
	const controlPropsDefaults = {
		label: __('Select Options', 'aquamin'),
		__experimentalExpandOnFocus: true,
		expandOnFocus: true,
		__experimentalShowHowTo: false,
		showHowTo: false,
	};
	const controlPropsCombined = { ...controlPropsDefaults, ...controlProps };

	/**
	 * Check if we're applying to this block
	 * @param {string} name Block name.
	 */
	const isAffected = (name) => {
		return affectedBlocks.includes(name);
	};

	/**
	 * Modify attributes
	 * @param {Object} props Component props.
	 * @param {string} name  Block name.
	 */
	const modifyAttributes = (props, name) => {
		// if we're supposed to edit this block and haven't defined this attribute
		if (isAffected(name) && !props.attributes[varName]) {
			// add attributes to what already exists
			const attributes = {
				...props.attributes,
				[varName]: {
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

	addFilter('blocks.registerBlockType', slug, modifyAttributes);

	/**
	 * Modify editor controls
	 */
	const withModifyEdit = createHigherOrderComponent(
		// eslint-disable-next-line react/display-name, arrow-body-style
		(BlockEdit) => (props) => {
			// Bail if we're not supposed to show the control
			if (!show(props)) {
				return <BlockEdit {...props} />;
			}
			// if we're supposed to edit this block
			const { name } = props;
			if (isAffected(name)) {
				// grab the props we're interested in
				const { setAttributes, attributes } = props;

				// set up fake array of strings to mimic actual attribute objects
				const [selectedStrings, setSelectedStrings] = useState(
					[...attributes[varName]].map((pair) => {
						return pair.title;
					}),
				);

				// handle updates to tokens
				const handleChange = (tokens) => {
					// handle multiple/single selection
					let newTokens = [];
					if (tokens.length) {
						newTokens = multiple ? [...tokens] : [tokens.at(-1)];
					}
					// set fake string-based state
					setSelectedStrings(newTokens);
					// update actual attributes
					const newAttributes = [];
					newTokens.forEach((str) => {
						const match = classNames.find((obj) => {
							return obj.title === str;
						});
						if (match) {
							newAttributes.push(match);
						}
					});
					setAttributes({ [varName]: newAttributes });
				};

				// send the new control
				return (
					<>
						<BlockEdit {...props} />
						<InspectorControls group={group}>
							<Wrapper wrap={wrap} title={title}>
								<FormTokenField
									{...controlPropsCombined}
									value={selectedStrings}
									suggestions={classNames.map((opt) => {
										return opt.title;
									})}
									onChange={handleChange}
								/>
							</Wrapper>
						</InspectorControls>
					</>
				);
			}

			// everything's normal nothing to see here
			return <BlockEdit {...props} />;
		},
		'withModifyEdit',
	);

	addFilter('editor.BlockEdit', slug, withModifyEdit);

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
			if (attributes[varName]) {
				return {
					...props,
					className: classnames(
						props.className,
						attributes[varName].map((opt) => {
							return opt?.value;
						}),
					),
				};
			}
		}

		// everything's normal nothing to see here
		return props;
	};

	addFilter('blocks.getSaveContent.extraProps', slug, modifySave);

	/**
	 * Add attributes to editor
	 */
	const withShowModifyEdit = createHigherOrderComponent(
		// eslint-disable-next-line react/display-name
		(BlockListBlock) => (props) => {
			const { name, attributes } = props;
			// if we're supposed to edit this block
			if (isAffected(name)) {
				/**
				 * Extract our classes from the attributes. This is necessary because
				 * adding attributes in the editor appears to happen multiple times,
				 * so only the last set of classes added gets applied; so, this process
				 * re-adds the appropriate classes on each pass.
				 */
				const extractedClasses = Object.entries(attributes)
					.flatMap(([key, val]) =>
						key.startsWith('aquaminClassName') && Array.isArray(val)
							? val.map((obj) => obj.value)
							: [],
					)
					.join(' ');
				return (
					<BlockListBlock
						{...props}
						className={extractedClasses}
					/>
				);
			}

			// everything's normal nothing to see here
			return <BlockListBlock {...props} />;
		},
		'withShowModifyEdit',
	);

	addFilter('editor.BlockListBlock', slug, withShowModifyEdit);
};

/**
 * Define control wrapper
 *
 * Defaults to using a normal <PanelBody />, but you can customize the
 * wrapper by passing this a custom component.
 *
 * @param {Object} props          Props
 * @param {Object} props.children Children
 * @param {Object} props.wrap     Optional wrap element
 * @param {string} props.title    Human-readable title for the accordion (if defaulting to <PanelBody>)
 */
export const Wrapper = ({ wrap, title, children }) => {
	return wrap ? (
		cloneElement(wrap, {}, children)
	) : (
		<PanelBody title={title}>{children}</PanelBody>
	);
};

/**
 * Get attribute slug
 *
 * Returns an attribute like aquamin/my-block as aquaminClassNameMyBlock.
 *
 * Note that you may need to add this manually for dynamic blocks.
 * @param {string} slug Block slug (e.g. 'aquamin/my-block')
 */
export const getAttributeSlug = (slug) => {
	const camelCased = slug
		.replace(/[\/-]+(.)/g, (_, c) => c.toUpperCase()) // convert slashes and hyphens to camel case
		.replace(/^[a-z]/, (c) => c.toUpperCase()); // capitalize first letter
	return `aquaminClassName${camelCased}`;
};
