/**
 * Grid Item editor interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
import classnames from 'classnames';
import { Flex } from '../grd-edit';

const { __ } = wp.i18n;
const { useBlockProps, useInnerBlocksProps, InspectorControls } =
	wp.blockEditor;
const { TextControl, PanelBody } = wp.components;
const { select } = wp.data;
const { useState } = wp.element;

/**
 * Get span styles
 *
 * @param    {object}  span  Object containing responsive span amounts
 * @returns  {object}        Style object
 */
export const getSpan = (span) => {
	const style = {};
	Object.keys(span).forEach((size) => {
		if (span[size] > 1) {
			style[`--grd-span-${size}`] = `${span[size]}`;
		}
	});
	return style;
};

/**
 * Show "spans x of y" helper and highlight if invalid
 */
const SpanHelp = ({ span, count }) => {
	const style = span > count ? { color: 'red' } : {};
	return (
		<span style={style}>{`${span} ${__('of', 'aquamin')} ${count}`}</span>
	);
};

/**
 * Generate block editor component
 */
const GridItemEdit = ({ attributes, setAttributes, className, clientId }) => {
	const { span } = attributes;
	const { count } = select('core/block-editor').getBlock(
		select('core/block-editor').getBlockParents(clientId).at(-1)
	).attributes;
	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__('Span Columns', 'aquamin')}>
					<Flex>
						{[
							[__('Desktop', 'aquamin'), 'lg'],
							[__('Tablet', 'aquamin'), 'md'],
							[__('Mobile', 'aquamin'), 'sm'],
						].map((size, i) => {
							return (
								<TextControl
									key={i}
									label={size[0]}
									value={span[size[1]]}
									onChange={(value) => {
										setAttributes({
											span: {
												...span,
												[size[1]]: parseInt(value),
											},
										});
									}}
									min={1}
									type="number"
									max={count[size[1]] || 12}
									step={1}
									help={
										<SpanHelp
											count={count[size[1]]}
											span={span[size[1]]}
										/>
									}
								/>
							);
						})}
					</Flex>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: classnames(
						'grd__item',
						className,
						// add invalid class if we span more columns than exist
						!!Object.keys(span).find(
							(key) => span[key] > count[key]
						) && 'grd__item--invalid'
					),
					style: { ...getSpan(span) },
				})}
			>
				<div
					{...useInnerBlocksProps(
						{ className: 'grd__frame' },
						{
							template: [['core/paragraph']],
						}
					)}
				/>
			</div>
		</>
	);
};
export default GridItemEdit;
