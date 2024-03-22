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
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, Icon, Button, ButtonGroup } from '@wordpress/components';
import { select } from '@wordpress/data';
import { TextControlList, getStyle, getStyleFromObject } from '../grd-edit';

/**
 * Generate block editor component
 */
const GridItemEdit = ({ attributes, setAttributes, className, clientId }) => {
	const { span, col, row, spanRow, vAlign, variation } = attributes;
	const { count } = select('core/block-editor').getBlock(
		select('core/block-editor').getBlockParents(clientId).at(-1)
	).attributes;

	const blockProps = useBlockProps({
		className: classnames(
			'grd__item',
			variation !== 'cell' && `grd__item--${variation}`,
			'ani-child',
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

	const templates = {
		cell: {
			template: [['core/paragraph']],
		},
		image: {
			template: [['core/image']],
			allowedBlocks: ['core/image'],
		},
		video: {
			template: [['core/video']],
			allowedBlocks: ['core/video'],
		},
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps },
		{ ...templates[variation] }
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
				<PanelBody
					title={__('Vertical Alignment', 'aquamin')}
					initialOpen={false}
				>
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
