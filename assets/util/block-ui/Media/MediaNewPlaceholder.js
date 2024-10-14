/**
 * Dependencies
 */
import classnames from 'classnames';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { handleMediaSelect, handleURLSelect } from './media-util';

/**
 * Output new media adder
 * @param {Object}  props
 * @param {string}  props.className
 * @param {string}  props.title
 * @param {Object}  props.attributes
 * @param {Object}  props.attributeNames
 * @param {Array}   props.accept
 * @param {Array}   props.allowedTypes
 * @param {boolean} props.editable
 * @param {boolean} props.hidePlaceholder
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
