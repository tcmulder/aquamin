/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { handleMediaSelect, handleURLSelect } from './media-util';

/**
 * Output editor for existing media
 * @param {Object} props
 */
export const MediaBlockControls = (props) => {
	const {
		editable,
		hideInBlockControls,
		attributeNames,
		attributes,
		allowedTypes,
		accept,
		title,
	} = props;
	if (editable && !hideInBlockControls) {
		return (
			<BlockControls>
				<ToolbarGroup>
					<MediaReplaceFlow
						allowedTypes={allowedTypes}
						accept={accept}
						onSelectURL={(value) => handleURLSelect(value, props)}
						onSelect={(value) => handleMediaSelect(value, props)}
						mediaId={attributes[attributeNames.id]}
						mediaURL={attributes[attributeNames.url]}
						name={`${__('Replace', 'aquamin')} ${title}`}
					/>
				</ToolbarGroup>
			</BlockControls>
		);
	}

	return null;
};
