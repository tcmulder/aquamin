/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { FocalPointPicker } from '@wordpress/components';
import { ButtonX } from '../Buttons';
import { MediaElement } from './MediaElement';

/**
 * Output editor for existing media
 * @param {Object} props
 */
export const MediaEditor = (props) => {
	const { attributeNames, attributes, setAttributes, editable, showFocal } =
		props;
	const show = editable && attributes[attributeNames.url];
	return show ? (
		<>
			<div className="aquamin-media-remove">
				<ButtonX
					label={__('Remove Media', 'aquamin')}
					handleClick={() =>
						setAttributes({
							[attributeNames.id]: '',
							[attributeNames.url]: '',
							[attributeNames.alt]: '',
							[attributeNames.width]: '',
							[attributeNames.height]: '',
							[attributeNames.focalX]: '',
							[attributeNames.focalY]: '',
						})
					}
					style={{
						position: 'absolute',
						zIndex: '10',
						border: '2px solid currentColor',
					}}
				/>
			</div>
			{showFocal ? (
				<FocalPointPicker
					url={attributes[attributeNames.url]}
					value={{
						x: attributes[attributeNames.focalX],
						y: attributes[attributeNames.focalY],
					}}
					onChange={(value) => {
						setAttributes({
							[attributeNames.focalX]: value.x,
							[attributeNames.focalY]: value.y,
						});
					}}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			) : (
				<MediaElement {...props} editable={false} />
			)}
		</>
	) : null;
};
