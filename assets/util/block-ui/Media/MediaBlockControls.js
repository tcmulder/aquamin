/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { handleMediaSelect, handleURLSelect } from './media-util';

/**
 * Output block controls
 *
 * @param {Object}  props                     All Media props
 * @param {boolean} props.editable            Whether or not this is editable (i.e. edit/save)
 * @param {boolean} props.hideInBlockControls Weather or not to show block controls
 * @param {Object}  props.attributeNames      Object attribute names
 * @param {Object}  props.attributes          Media block attributes
 * @param {Array}   props.allowedTypes        Array of allowed mime types (e.g. ['image', 'video'])
 * @param {Array}   props.accept              Array of accepted upload types (e.g. ['image/*', 'video/*'])
 * @param {string}  props.title               Media's name in the editor
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
