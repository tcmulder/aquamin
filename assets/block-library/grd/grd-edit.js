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
 * Get grid gap value
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
 * Get aspect ratio
 *
 * @param    {object}   minAspect  Aspect ratio x and y
 * @returns  {object}              Aspect ratio CSS value
 */
export const getAspect = (minAspect) => {
	return minAspect.x && minAspect.y
		? { '--grd-aspect': `${minAspect.y}/${minAspect.x}` }
		: {};
};

/**
 * Wrap inspector controls side by side
 */
export const Flex = ({ title, children }) => {
	return (
		<>
			{title && <h2>{title}</h2>}
			<div style={{ display: 'flex', gap: '5px' }}>{children}</div>
		</>
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
					return (
						<TextControl
							key={i}
							label={size[0]}
							value={attributes[attributeName][size[1]]}
							onChange={(value) => {
								setAttributes({
									[attributeName]: {
										...attributes[attributeName],
										[size[1]]: parseFloat(value),
									},
								});
							}}
							min={1}
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
	const { count, hasMedia, minAspect } = attributes;
	const { x, y } = minAspect;
	const hasAspect = x && y;
	const blockProps = useBlockProps({
		className: classnames(
			'grd',
			hasAspect && 'grd--has-aspect',
			hasMedia && 'grd--stretch-media',
			className
		),
		style: {
			'--grd-count-lg': `${count.lg}`,
			'--grd-count-md': `${count.md}`,
			'--grd-count-sm': `${count.sm}`,
			...getGap(attributes, 'top'),
			...getGap(attributes, 'left'),
			...getAspect(minAspect),
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
					<ToggleControl
						label={__('Fit media to grid cells', 'aquamin')}
						checked={hasMedia}
						onChange={() => setAttributes({ hasMedia: !hasMedia })}
					/>
					<TextControlList
						title={__('Number of Columns', 'aquamin')}
						attributeName="count"
						attributes={attributes}
						setAttributes={setAttributes}
						max={12}
					/>
					<TextControlList
						title={__('Row Aspect Ratio (optional)', 'aquamin')}
						attributeName="minAspect"
						attributes={attributes}
						setAttributes={setAttributes}
						opts={[
							[__('Width', 'aquamin'), 'y'],
							[__('Height', 'aquamin'), 'x'],
						]}
						step={0.1}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
		</>
	);
};
export default GridBlockEdit;
