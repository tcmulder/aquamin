/**
 * Grid Item editor interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */

import {
	justifyCenter,
	justifyLeft,
	justifyRight,
	justifyStretch,
} from '@wordpress/icons';
import classnames from 'classnames';
import { TextControlList } from '../grd-edit';

const { __ } = wp.i18n;
const { useBlockProps, useInnerBlocksProps, InspectorControls } =
	wp.blockEditor;
const { TextControl, PanelBody, Icon, Button, ButtonGroup } = wp.components;
const { select } = wp.data;

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
 * Get alignment styles
 *
 * @param    {string}  align  Alignment value
 * @returns  {object}         Style object
 */
export const getVAlign = (align) => {
	const style = {};
	if (align !== 'stretch') {
		style[`--grd-v-align`] = align;
	}
	return style;
};

/**
 * Generate block editor component
 */
const GridItemEdit = ({ attributes, setAttributes, className, clientId }) => {
	const { span, vAlign } = attributes;
	const { count } = select('core/block-editor').getBlock(
		select('core/block-editor').getBlockParents(clientId).at(-1)
	).attributes;
	const blockProps = useBlockProps({
		className: classnames(
			'grd__item',
			className,
			// add invalid class if we span more columns than exist
			!!Object.keys(span).find((key) => span[key] > count[key]) &&
				'grd__item--invalid'
		),
		style: { ...getSpan(span), ...getVAlign(vAlign) },
	});
	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps },
		{ template: [['core/paragraph']] }
	);

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__('Grid Cell Column & Row', 'aquamin')}>
					<TextControlList
						title={__('Span Columns', 'aquamin')}
						attributeName="span"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>
				<PanelBody title={__('Vertical Alignment', 'aquamin')}>
					<ButtonGroup>
						{[
							{
								label: __('Stretch'),
								icon: justifyStretch,
								value: 'stretch',
							},
							{
								label: __('Align Top'),
								icon: justifyLeft,
								value: 'flex-start',
							},
							{
								label: __('Align Center'),
								icon: justifyCenter,
								value: 'center',
							},
							{
								label: __('Align Bottom'),
								icon: justifyRight,
								value: 'flex-end',
							},
						].map((opt, i) => {
							return (
								<Button
									key={i}
									label={opt.label}
									value={opt.value}
									isPressed={opt.value === vAlign}
									onClick={() =>
										setAttributes({ vAlign: opt.value })
									}
									icon={
										<Icon
											icon={opt.icon}
											style={{
												transform: 'rotate(90deg)',
											}}
										/>
									}
								/>
							);
						})}
					</ButtonGroup>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps}>
				<div className="grd__frame">{innerBlocksProps.children}</div>
			</div>
		</>
	);
};
export default GridItemEdit;
