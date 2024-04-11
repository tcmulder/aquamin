/**
 * Add custom ani
 *
 * Add animations to blocks
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

/**
 * Identify the extension's name
 */
const extensionName = 'aquamin/ani';

/**
 * Check if we're applying to this block
 */
const affectedBlocks = [
	'core/buttons',
	'core/columns',
	'core/cover',
	'core/group',
	'core/heading',
	'core/image',
	'core/paragraph',
	'core/separator',
	'core/video',
	'aquamin/grd',
];
const isAffected = (name, blocks) => {
	affected = blocks || affectedBlocks;
	return affected.includes(name);
};

/**
 * Create a validation component.
 * @param {Object} root0
 * @param {Array}  root0.aquaminClassNameAni
 */
const Validation = ({ aquaminClassNameAni }) => {
	// start without a message
	const msgs = [];
	// get the animations the user selected
	const chosen = aquaminClassNameAni.map((aniPair) =>
		aniPair.value.substring(5),
	);
	// handle set conflicts
	[
		['up', 'down'],
		['left', 'right'],
	].forEach((set) => {
		const check = set.map((name) => chosen.includes(name));
		if (!check.includes(false)) {
			msgs.push(
				`${__('animations', 'aquamin')} ${set.join(', ')} ${__(
					'may conflict with each other.',
					'aquamin',
				)}`,
			);
		}
	});
	// handle single animations
	['parallax', 'background', 'foreground'].forEach((name) => {
		if (chosen.includes(name) && chosen.length > 1) {
			msgs.push(
				`${name} ${__(
					'may conflict with with other animations applied.',
					'auamin',
				)}`,
			);
		}
	});
	return msgs.length ? (
		<>
			<p>
				<strong
					style={{ color: 'var(--wp--preset--color--vivid-red)' }}
				>
					{__('Warning: ', 'aquamin')}
				</strong>
			</p>
			<ul style={{ 'list-style': 'square', 'padding-left': '1em' }}>
				{msgs.map((msg, i) => (
					<li key={i}>{msg}</li>
				))}
			</ul>
		</>
	) : null;
};

/**
 * Modify attributes
 * @param {Object} props
 * @param {string} name
 */
const modifyAttributes = (props, name) => {
	// if we're supposed to edit this block
	if (isAffected(name)) {
		// add attributes to what already exists
		const attributes = {
			...props.attributes,
			aquaminClassNameAni: {
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

addFilter('blocks.registerBlockType', extensionName, modifyAttributes);

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
				attributes: { aquaminClassNameAni },
				setAttributes,
			} = props;

			// define classes
			let classNames = [
				{ value: 'ani--opacity', title: 'Opacity' },
				{ value: 'ani--scale', title: 'Scale' },
				{ value: 'ani--blur', title: 'Blur' },
				{ value: 'ani--up', title: 'Up' },
				{ value: 'ani--down', title: 'Down' },
				{ value: 'ani--left', title: 'Left' },
				{ value: 'ani--right', title: 'Right' },
				{ value: 'ani--3d', title: '3D' },
			];

			// add some special ones
			if (
				isAffected(name, ['core/group', 'core/columns', 'core/cover'])
			) {
				classNames = [
					{
						value: 'ani--foreground',
						title: 'Foreground',
					},
					{
						value: 'ani--background',
						title: 'Background',
					},
					...classNames,
				];
			}
			if (isAffected(name, ['core/cover'])) {
				classNames = [
					{
						value: 'ani--parallax',
						title: 'Parallax',
					},
					...classNames,
				];
			}
			if (isAffected(name, ['core/separator'])) {
				classNames = [
					{
						value: 'ani--scale-x',
						title: 'Grow',
					},
					...classNames,
				];
			}

			// set up fake array of strings to mimic actual attribute objects
			const [selectedStrings, setSelectedStrings] = useState(
				[...aquaminClassNameAni].map((pair) => pair.title),
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
				setAttributes({ aquaminClassNameAni: newAttributes });
			};

			// send the new control
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorControls group="styles">
						<PanelBody title={__('Animations', 'aquamin')}>
							<FormTokenField
								value={selectedStrings}
								label={__('Properties to animate', 'aquamin')}
								suggestions={classNames.map((opt) => opt.title)}
								onChange={handleChange}
								__experimentalExpandOnFocus
								expandOnFocus
								__experimentalShowHowTo={false}
								showHowTo
							/>
							<Validation
								aquaminClassNameAni={aquaminClassNameAni}
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

addFilter('editor.BlockEdit', extensionName, withModifyEdit);

/**
 * Save attributes
 * @param {Object} props
 * @param {Object} block
 * @param {Object} attributes
 */
const modifySave = (props, block, attributes) => {
	// if we're supposed to edit this block
	const { name } = block;
	if (isAffected(name)) {
		// add the classes to the block wrap
		if (attributes.aquaminClassNameAni) {
			const existingClasses = props.className
				? props.className.split(' ')
				: [];
			const newClasses = attributes.aquaminClassNameAni
				.map((opt) => opt.value)
				.filter((title) => !existingClasses.includes(title));
			newClasses.push(
				newClasses.length && !newClasses.includes('ani') ? 'ani' : '',
			);
			return {
				...props,
				className: classnames(existingClasses, newClasses),
			};
		}
	}

	// everything's normal nothing to see here
	return props;
};

addFilter('blocks.getSaveContent.extraProps', extensionName, modifySave);
