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

const { __ } = wp.i18n;
const { useBlockProps, useInnerBlocksProps, InspectorControls } =
	wp.blockEditor;
const { ToggleControl, TextControl, PanelBody } = wp.components;

/**
 * Get style for grid gaps (using WordPress's built in gap system)
 *
 * @param    {object} attributes  All block attributes for us to dig through
 * @param    {string} side        Grid gap side 'left' or 'top' to retrieve
 * @returns  {object}             Grid gap css custom property object
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
 * @param   {string}    name      Custom property name
 * @param   {mixed}     value 	  Value of the property (string or number)
 * @param   {function}  validate  Validation function (defaults to checking truthy)
 * @returns {object}              Style object (or {} if didn't pass validation)
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
 * @param   {string}    nameBase  Custom property name base (keys in object get appended as suffix)
 * @param   {object}    obj       Object with key (used as name suffix) and value (property value)
 * @param   {function}  validate  Validation function (defaults to checking truthy)
 * @returns {object}              Style object (or {} if didn't pass validation)
 */
export const getStyleFromObject = (
	nameBase,
	obj,
	validate = (val) => !!val
) => {
	return Object.assign(
		{},
		...Object.keys(obj).map((key) =>
			getStyle(`${nameBase}-${key}`, obj[key], validate)
		)
	);
};

/**
 * Handle responsive number values
 */
export const TextControlList = ({
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
}) => {
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
 */
const GridBlockEdit = ({ attributes, setAttributes, className }) => {
	const { count, hasEqualRows, minAspect } = attributes;
	const { x, y } = minAspect;
	const hasAspect = x && y;
	const blockProps = useBlockProps({
		className: classnames(
			'grd',
			hasAspect && 'grd--has-aspect',
			hasEqualRows && 'grd--has-equal-rows',
			'ani-parent',
			className
		),
		style: {
			...getStyleFromObject('--grd-count', count),
			...getGap(attributes, 'top'),
			...getGap(attributes, 'left'),
			...getStyle('--grd-aspect', minAspect.x / minAspect.y),
		},
	});

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps },
		{
			template: Array(4).fill(['aquamin/grd-item']),
			allowedBlocks: ['aquamin/grd-item'],
			orientation: 'horizontal',
		}
	);

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
