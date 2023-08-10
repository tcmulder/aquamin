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
			style[`--grd-span-${size}`] = span[size];
		}
	});
	return style;
};

/**
 * Generate block editor component
 */
const GridItemEdit = ({ attributes, setAttributes, className, clientId }) => {
	const { span } = attributes;

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
									max={12}
									step={1}
								/>
							);
						})}
					</Flex>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: classnames('grd__item', className),
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
