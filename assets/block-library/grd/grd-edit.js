/**
 * Grid editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { ToggleControl, TextControl, PanelBody } from '@wordpress/components';

/**
 * Get style for grid gaps (using WordPress's built in gap system)
 *
 * @param {Object} attributes All block attributes for us to dig through.
 * @param {string} side       Grid gap side 'left' or 'top' to retrieve.
 * @return  {Object}          Grid gap css custom property object.
 */
export const getGap = (attributes, side) => {
	let gap = {};
	const gaps = attributes.style?.spacing?.blockGap;
	if (gaps?.[side] && gaps[side] !== '0') {
		gap = {
			[`--grd-gap-${side}`]: `var(${gaps[side]
				.replace(/var:preset/, '--wp--preset')
				.replaceAll('|', '--')})`,
		};
	}
	return gap;
};

/**
 * Get custom property style attribute from a string
 *
 * @param {string}        name     Custom property name.
 * @param {string|number} value    Value of the property (string or number).
 * @param {Function}      validate Validation function (defaults to checking truthy).
 * @return {Object}                Style object (or {} if didn't pass validation)
 */
export const getStyle = (name, value, validate = (val) => !!val) => {
	const style = {};
	if (value && (!validate || validate(value))) {
		style[name] = `${value}`;
	}
	return style;
};

/**
 * Get custom property style attributes from an object
 *
 * @param {string}   nameBase Custom property name base (keys in object get appended as suffix).
 * @param {Object}   obj      Object with key (used as name suffix) and value (property value).
 * @param {Function} validate Validation function (defaults to checking truthy).
 * @return {Object}           Style object (or {} if didn't pass validation)
 */
export const getStyleFromObject = (
	nameBase,
	obj,
	validate = (val) => !!val,
) => {
	return Object.assign(
		{},
		...Object.keys(obj).map((key) =>
			getStyle(`${nameBase}-${key}`, obj[key], validate),
		),
	);
};

/**
 * Handle responsive number values
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.title         Title for the control group.
 * @param {string}   props.attributeName Name of the attribute to modify.
 * @param {Object}   props.attributes    All block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @param {Array}    props.opts          Options available for responsive breakpoints.
 * @param {number}   props.step          Step increment for number input.
 * @param {number}   props.min           Minimum value for number input.
 * @param {number}   props.max           Maximum value for number input.
 */
export const TextControlList = (props) => {
	// get the props we care about
	const {
		title,
		attributeName,
		attributes,
		setAttributes,
		opts = [
			[__('Desktop', 'aquamin'), 'lg'],
			[__('Tablet', 'aquamin'), 'md'],
			[__('Mobile', 'aquamin'), 'sm'],
		],
		step = 1,
		min = 0,
		max,
	} = props;

	return (
		<fieldset>
			{title && (
				<legend>
					<h2>{title}</h2>
				</legend>
			)}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${opts.length}, 1fr)`,
					gap: '5px',
				}}
			>
				{opts.map((size, i) => {
					const val = attributes[attributeName][size[1]];
					return (
						<TextControl
							key={i}
							label={size[0]}
							value={val !== 0 ? val : null}
							onChange={(value) => {
								setAttributes({
									[attributeName]: {
										...attributes[attributeName],
										[size[1]]: parseFloat(value),
									},
								});
							}}
							min={min}
							type="number"
							max={max}
							step={step}
						/>
					);
				})}
			</div>
		</fieldset>
	);
};

/**
 * Generate block editor component
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    All block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @param {string}   props.className     Block class name.
 */
const GridBlockEdit = (props) => {
	const { attributes, setAttributes, className } = props;
	const { count, hasEqualRows, minAspect } = attributes;
	const { x, y } = minAspect;
	const hasAspect = x && y;
	const blockProps = useBlockProps({
		className: classnames(
			'grd',
			hasAspect && 'grd--has-aspect',
			hasEqualRows && 'grd--has-equal-rows',
			'ani-parent',
			className,
		),
		style: {
			...getStyleFromObject('--grd-count', count),
			...getGap(attributes, 'top'),
			...getGap(attributes, 'left'),
			...getStyle('--grd-aspect', minAspect.x / minAspect.y),
		},
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: Array(4).fill(['aquamin/grd-item']),
		allowedBlocks: ['aquamin/grd-item'],
		orientation: 'horizontal',
	});

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__('Grid Columns & Rows', 'aquamin')}>
					<TextControlList
						title={__('Number of Columns', 'aquamin')}
						attributeName="count"
						attributes={attributes}
						setAttributes={setAttributes}
						max={12}
						min={1}
					/>
					<TextControlList
						title={__('Row Aspect Ratio (optional)', 'aquamin')}
						attributeName="minAspect"
						attributes={attributes}
						setAttributes={setAttributes}
						opts={[
							[__('Width', 'aquamin'), 'x'],
							[__('Height', 'aquamin'), 'y'],
						]}
						step={0.1}
					/>
					<ToggleControl
						label={__('Equalize row heights', 'aquamin')}
						checked={hasEqualRows}
						onChange={() =>
							setAttributes({ hasEqualRows: !hasEqualRows })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
		</>
	);
};
export default GridBlockEdit;
