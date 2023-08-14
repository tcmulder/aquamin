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
import { TextControlList, getStyle, getStyleFromObject } from '../grd-edit';

const { __ } = wp.i18n;
const { useBlockProps, useInnerBlocksProps, InspectorControls } =
	wp.blockEditor;
const { PanelBody, Icon, Button, ButtonGroup } = wp.components;
const { select } = wp.data;

/**
 * Generate block editor component
 */
const GridItemEdit = ({ attributes, setAttributes, className, clientId }) => {
	const { span, col, row, spanRow, vAlign } = attributes;
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
		style: {
			...getStyleFromObject('--grd-span', span, (val) => val > 1),
			...getStyle('--grd-v-align', vAlign, (val) => val !== 'stretch'),
			...getStyleFromObject('--grd-col', col),
			...getStyleFromObject('--grd-row', row),
			...getStyleFromObject('--grd-span-row', spanRow, (val) => val > 1),
		},
	});

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps },
		{ template: [['core/paragraph']] }
	);

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__('Column Spanning', 'aquamin')}>
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
				<PanelBody
					title={__('Advanced Columns & Rows', 'aquamin')}
					initialOpen={false}
				>
					<TextControlList
						title={__('Force Column', 'aquamin')}
						attributeName="col"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<TextControlList
						title={__('Force Row', 'aquamin')}
						attributeName="row"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<TextControlList
						title={__('Span Rows', 'aquamin')}
						attributeName="spanRow"
						attributes={attributes}
						setAttributes={setAttributes}
						min={1}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps}>
				<div className="grd__frame">{innerBlocksProps.children}</div>
			</div>
		</>
	);
};
export default GridItemEdit;
