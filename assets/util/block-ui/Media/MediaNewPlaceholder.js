/**
 * Dependencies
 */
import classnames from 'classnames';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { handleMediaSelect, handleURLSelect } from './media-util';

/**
 * Output new media adder
 *
 * @param {Object}  props                 All Media props
 * @param {string}  props.className       Media's class name (in addition to .media)
 * @param {string}  props.title           Media's name in the editor
 * @param {Object}  props.attributes      Media block attributes
 * @param {Object}  props.attributeNames  Object attribute names
 * @param {Array}   props.accept          Array of accepted upload types (e.g. ['image/*', 'video/*'])
 * @param {Array}   props.allowedTypes    Array of allowed mime types (e.g. ['image', 'video'])
 * @param {boolean} props.editable        Whether or not this is editable (i.e. edit/save)
 * @param {boolean} props.hidePlaceholder Wether or not to hide the placeholder altogether
 */
export const MediaNewPlaceholder = (props) => {
	const {
		className,
		title,
		attributes,
		attributeNames,
		accept,
		allowedTypes,
		editable,
		hidePlaceholder,
	} = props;
	if (editable && !hidePlaceholder) {
		return (
			<MediaPlaceholder
				disableDropZone={false}
				className={classnames('media', className)}
				labels={{
					title,
				}}
				value={attributes[attributeNames.id]}
				onSelectURL={(value) => handleURLSelect(value, props)}
				onSelect={(value) => handleMediaSelect(value, props)}
				accept={accept}
				allowedTypes={allowedTypes}
			/>
		);
	}

	return null;
};
