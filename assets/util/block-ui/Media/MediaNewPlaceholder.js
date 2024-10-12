/**
 * Dependencies
 */
import classnames from 'classnames';
import { MediaPlaceholder } from '@wordpress/block-editor';

/**
 * Output new media adder
 * @param {Object}   root0
 * @param {string}   root0.className
 * @param {string}   root0.title
 * @param {Object}   root0.attributes
 * @param {Object}   root0.attributeNames
 * @param {Function} root0.setAttributes
 * @param {Array}    root0.accept
 * @param {Array}    root0.allowedTypes
 * @param {boolean}  root0.editable
 * @param {boolean}  root0.showFocal
 */
export const MediaNewPlaceholder = ({
	className,
	title,
	attributes,
	attributeNames,
	setAttributes,
	accept,
	allowedTypes,
	editable,
	showFocal,
}) => {
	const show = editable && !attributes[attributeNames.url];
	return show ? (
		<MediaPlaceholder
			disableDropZone={false}
			className={classnames(
				'media',
				className,
				showFocal ? 'media--focal' : '',
			)}
			labels={{
				title,
			}}
			value={attributes[attributeNames.id]}
			onSelectURL={(value) =>
				setAttributes({
					[attributeNames.url]: value,
				})
			}
			onSelect={(value) =>
				setAttributes({
					[attributeNames.id]: value.id,
					[attributeNames.url]: value.url,
					[attributeNames.alt]: value.alt,
					[attributeNames.width]: value.width,
					[attributeNames.height]: value.height,
				})
			}
			accept={accept}
			allowedTypes={allowedTypes}
		/>
	) : null;
};
