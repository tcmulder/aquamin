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
const { RangeControl, ToggleControl, TextControl, PanelBody, Icon } =
	wp.components;

/**
 * Generate block editor component
 */
const GridBlockEdit = ({ attributes, setAttributes, className }) => {
	const { count, hasEqualRows, minAspect } = attributes;
	const getGap = (side) => {
		let str = attributes.style.spacing.blockGap[side];
		if (str !== '0') {
			str = `var(${str
				.replace(/var:preset/, '--wp--preset')
				.replaceAll('|', '--')})`;
		}
		return str;
	};
	const updateArray = (key, index, value) => {
		const arr = [...attributes[key]];
		arr[index] = value;
		setAttributes({ [key]: arr });
	};
	const style = {
		'--grd-count-lg': `${count[0]}`,
		'--grd-count-md': `${count[1]}`,
		'--grd-count-sm': `${count[2]}`,
		'--grd-gap-y': getGap('top'),
		'--grd-gap-x': getGap('left'),
		'--grd-aspect': !minAspect.includes(0)
			? `${minAspect[0]}/${minAspect[1]}`
			: 'auto',
	};

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__('Grid Columns', 'aquamin')}>
					<RangeControl
						label={__('Desktop Columns', 'aquamin')}
						value={count[0]}
						onChange={(value) => updateArray('count', 0, value)}
						min={1}
						max={12}
						withInputField={false}
						beforeIcon={<Icon icon="desktop" />}
					/>
					<RangeControl
						label={__('Tablet Columns', 'aquamin')}
						value={count[1]}
						onChange={(value) => updateArray('count', 1, value)}
						min={1}
						max={12}
						withInputField={false}
						beforeIcon={<Icon icon="tablet" />}
					/>
					<RangeControl
						label={__('Mobile Columns', 'aquamin')}
						value={count[2]}
						onChange={(value) => updateArray('count', 2, value)}
						min={1}
						max={12}
						withInputField={false}
						beforeIcon={<Icon icon="smartphone" />}
					/>
				</PanelBody>
				<PanelBody
					title={__('Grid Rows', 'aquamin')}
					initialOpen={false}
				>
					<br />
					<ToggleControl
						label={__('Equal Height Rows', 'aquamin')}
						checked={hasEqualRows}
						onChange={() =>
							setAttributes({ hasEqualRows: !hasEqualRows })
						}
					/>
					{hasEqualRows && (
						<>
							<p>
								{__('DEFAULT ASPECT RATIO', 'aquamin')}:
								<br />
								<em>
									(
									{__(
										'applies to grid items that do not span',
										'aquamin'
									)}
									)
								</em>
							</p>
							<div
								style={{
									display: 'flex',
									alignItems: 'flex-end',
								}}
							>
								<div>
									<TextControl
										label={__('Width')}
										value={minAspect[0] || 'auto'}
										onChange={(value) =>
											updateArray('minAspect', 0, value)
										}
									/>
								</div>
								<div style={{ padding: '1em' }}>:</div>
								<div>
									<TextControl
										label={__('Height')}
										value={minAspect[1] || 'auto'}
										onChange={(value) =>
											updateArray('minAspect', 1, value)
										}
									/>
								</div>
							</div>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<div
				{...useInnerBlocksProps(
					{},
					{
						template: Array(4).fill(['aquamin/grd-item']),
						allowedBlocks: ['aquamin/grd-item'],
					}
				)}
				{...useBlockProps({
					className: classnames('grd', className),
					style,
				})}
			/>
		</>
	);
};
export default GridBlockEdit;
