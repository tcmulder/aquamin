/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';

/**
 * Output editor for existing media
 * @param {Object} props
 */
export const MediaBlockControls = (props) => {
	const {
		editable,
		attributeNames,
		attributes,
		setAttributes,
		allowedTypes,
		accept,
	} = props;
	if (editable) {
		return (
			<BlockControls>
				<MediaReplaceFlow
					allowedTypes={allowedTypes}
					accept={accept}
					onSelectURL={(value) =>
						setAttributes({
							[attributeNames.url]: value,
						})
					}
					onSelect={(value) => {
						return setAttributes({
							[attributeNames.id]: value.id,
							[attributeNames.url]: value.url,
							[attributeNames.alt]: value.alt,
							[attributeNames.width]: value.width,
							[attributeNames.height]: value.height,
						});
					}}
					mediaId={attributes[attributeNames.id]}
					mediaURL={attributes[attributeNames.url]}
					name={__('Add')}
				/>
			</BlockControls>
		);
	}

	return null;
};
