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
const { useState } = wp.element;

export const getGap = ({ attributes, side }) => {
	const gaps = attributes.style?.spacing?.blockGap;
	if (gaps?.[side] && gaps[side] !== '0') {
		return `var(${gaps[side]
			.replace(/var:preset/, '--wp--preset')
			.replaceAll('|', '--')})`;
	}
	return '0';
};

export const getAspect = ({ minAspect, hasAspect, hasEqualRows }) => {
	if (!hasEqualRows && !minAspect.includes(0) && hasAspect) {
		return `${minAspect[0]}/${minAspect[1]}`;
	}
	return 'auto';
};
/**
 * Generate block editor component
 */
const GridBlockEdit = ({ attributes, setAttributes, className }) => {
	const { count, hasEqualRows, hasAspect, hasMedia, minAspect } = attributes;
	const updateArray = (key, index, value) => {
		const arr = [...attributes[key]];
		arr[index] = value;
		setAttributes({ [key]: arr });
	};
	const aspect = getAspect(attributes);
	return (
		<>
			<InspectorControls group="styles">
				<PanelBody
					title={__('Grid Columns', 'aquamin')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Desktop Columns', 'aquamin')}
						value={count[0]}
						onChange={(value) => updateArray('count', 0, value)}
						min={1}
						max={12}
						step={1}
						beforeIcon={<Icon icon="desktop" />}
					/>
					<RangeControl
						label={__('Tablet Columns', 'aquamin')}
						value={count[1]}
						onChange={(value) => updateArray('count', 1, value)}
						min={1}
						max={12}
						step={1}
						beforeIcon={<Icon icon="tablet" />}
					/>
					<RangeControl
						label={__('Mobile Columns', 'aquamin')}
						value={count[2]}
						onChange={(value) => updateArray('count', 2, value)}
						min={1}
						max={12}
						step={1}
						beforeIcon={<Icon icon="smartphone" />}
					/>
				</PanelBody>
				<PanelBody
					title={__('Grid Rows', 'aquamin')}
					initialOpen={false}
				>
					<ToggleControl
						label={__('Stretch media to fit', 'aquamin')}
						checked={hasMedia}
						onChange={() => setAttributes({ hasMedia: !hasMedia })}
					/>
					<ToggleControl
						label={__('Equal height rows', 'aquamin')}
						checked={hasEqualRows}
						onChange={() =>
							setAttributes({ hasEqualRows: !hasEqualRows })
						}
					/>
					<ToggleControl
						label={__('Default aspect ratio', 'aquamin')}
						checked={!hasEqualRows ? hasAspect : false}
						onChange={() =>
							setAttributes({ hasAspect: !hasAspect })
						}
						disabled={hasEqualRows}
						title={
							hasEqualRows &&
							__(
								'Aspect ratio is incompatible with equal height rows',
								'aquamin'
							)
						}
					/>
					{!hasEqualRows && hasAspect && (
						<div
							style={{
								display: 'flex',
								alignItems: 'flex-end',
							}}
						>
							<div>
								<TextControl
									label={__('Width')}
									value={minAspect[0] || ''}
									placeholder="auto"
									onChange={(value) =>
										updateArray('minAspect', 0, value)
									}
								/>
							</div>
							<div style={{ padding: '1em' }}>:</div>
							<div>
								<TextControl
									label={__('Height')}
									value={minAspect[1] || ''}
									placeholder="auto"
									onChange={(value) =>
										updateArray('minAspect', 1, value)
									}
								/>
							</div>
						</div>
					)}
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({ className: classnames('grd', className) })}
			>
				<div
					{...useInnerBlocksProps(
						{
							className: classnames(
								'grd__grid',
								aspect && 'grd__grid--has-aspect',
								hasMedia && 'grd__grid--has-media'
							),
							style: {
								'--grd-count-lg': `${count[0]}`,
								'--grd-count-md': `${count[1]}`,
								'--grd-count-sm': `${count[2]}`,
								'--grd-gap-y': getGap({
									side: 'top',
									attributes,
								}),
								'--grd-gap-x': getGap({
									side: 'left',
									attributes,
								}),
								'--grd-rows': hasEqualRows ? '1fr' : 'auto',
								'--grd-aspect': aspect,
							},
						},
						{
							template: Array(4).fill(['aquamin/grd-item']),
							allowedBlocks: ['aquamin/grd-item'],
						}
					)}
				/>
			</div>
		</>
	);
};
export default GridBlockEdit;
