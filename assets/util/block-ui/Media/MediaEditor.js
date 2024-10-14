/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { FocalPointPicker } from '@wordpress/components';
import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { MediaElement } from './MediaElement';

/**
 * Output editor for existing media
 * @param {Object} props
 */
export const MediaEditor = (props) => {
	const { attributeNames, attributes, setAttributes, editable, hasFocal } =
		props;
	const show = editable && attributes[attributeNames.url];
	return show ? (
		<>
			<div className="aquamin-media-remove">
				<button
					label={__('Remove Media', 'aquamin')}
					onClick={() =>
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
				>
					TEMP
				</button>
			</div>
			{/* <BlockControls>
				<MediaReplaceFlow
					// allowedTypes={ ALLOWED_MEDIA_TYPES }
					accept="image/*"
					// handleUpload={ false }
					// onSelect={ updateImages }
					// name={ __( 'Add' ) }
					// multiple={ true }
					// mediaIds={ images
					// 	.filter( ( image ) => image.id )
					// 	.map( ( image ) => image.id ) }
					// addToGallery={ hasImageIds }
				/>
			</BlockControls> */}
			{hasFocal ? (
				<>
					<FocalPointPicker
						url={attributes[attributeNames.url]}
						value={{
							x: attributes[attributeNames.focal].x,
							y: attributes[attributeNames.focal].y,
						}}
						onChange={(value) => {
							setAttributes({
								[attributeNames.focal]: {
									x: value.x,
									y: value.y,
									objectFit: 'cover',
								},
							});
						}}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</>
			) : (
				<MediaElement {...props} editable={false} />
			)}
		</>
	) : null;
};
