/**
 * Media component
 *
 * Handles image/video media.
 * 
 * Usage:

// add this to the block.json file:
{
	"title": "Some Block With Media",
	...
	"attributes": {
		"mediaAlt": {
			"type": "string"
		},
		"mediaUrl": {
			"type": "string",
		},
		"mediaId": {
			"type": "number"
		},
		"mediaWidth": {
			"type": "number"
		},
		"mediaHeight": {
			"type": "number"
		}
	}
	...
}

Then use it within the edit function like:
<Media
	setAttributes={setAttributes}
	attributes={attributes}
	editable
/>

And use it within the save function like:
<Media />

 *
 */

/* eslint-disable react/prop-types */
/**
 * Dependencies
 */
import classnames from 'classnames';
import { ButtonX } from '../Buttons';

const { __ } = wp.i18n;
const { MediaPlaceholder } = wp.blockEditor;

/**
 * Get type of media
 */
const getType = (url) => {
	let type = 'image';
	if (url) {
		const ext = url.split('.').pop();
		if (['mp4', 'm4v', 'webm', 'ogv', 'flv'].includes(ext)) {
			type = 'video';
		} else if (['jpg', 'png', 'gif', 'jpeg', 'webp', 'svg'].includes(ext)) {
			type = 'image';
		}
	}
	return type;
};

/**
 * Videos and images renderer
 */
const ActualMedia = ({ attributeNames, attributes, className, style }) => {
	const type = getType(attributes[attributeNames.url]);
	if (type === 'video' && attributes[attributeNames.url]) {
		return (
			// eslint-disable-next-line jsx-a11y/media-has-caption
			<video
				className={classnames('media', className)}
				src={attributes[attributeNames.url]}
				width={attributes[attributeNames.width]}
				height={attributes[attributeNames.height]}
				loop=""
				autoPlay=""
				muted=""
				playsinline=""
				style={style}
			/>
		);
	}
	if (type === 'image' && attributes[attributeNames.url]) {
		return (
			<img
				className={classnames('media', className)}
				src={attributes[attributeNames.url]}
				width={attributes[attributeNames.width]}
				height={attributes[attributeNames.height]}
				alt={attributes[attributeNames.alt] || __('Media', 'aquamin')}
				style={style}
			/>
		);
	}

	return null;
};

/**
 * Basic video adder
 */
const Media = ({
	attributeNames = {
		alt: 'mediaAlt',
		url: 'mediaUrl',
		id: 'mediaId',
		width: 'mediaWidth',
		height: 'mediaHeight',
	},
	title,
	setAttributes,
	attributes,
	className,
	style,
	editable,
	accept,
	allowedTypes,
}) => {
	if (editable && attributes[attributeNames.url]) {
		return (
			<>
				<div className="aquamin-media-remove">
					<ButtonX
						label={__('Remove Media', 'lift-the-label')}
						handleClick={() =>
							setAttributes({
								[attributeNames.id]: '',
								[attributeNames.url]: '',
								[attributeNames.alt]: '',
								[attributeNames.width]: '',
								[attributeNames.height]: '',
							})
						}
						style={{ position: 'absolute', zIndex: '10' }}
					/>
				</div>
				<ActualMedia
					attributeNames={attributeNames}
					attributes={attributes}
					className={classnames('media', className)}
					style={style}
				/>
			</>
		);
	}
	if (editable) {
		return (
			<MediaPlaceholder
				disableDropZone={false}
				className={classnames('media', className)}
				style={style}
				labels={{
					title: title || __('Media Upload', 'lift-the-label'),
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
				accept={accept || ['image/*', 'video/*']}
				allowedTypes={allowedTypes || ['image', 'video']}
			/>
		);
	}

	return (
		<ActualMedia
			attributeNames={attributeNames}
			attributes={attributes}
			className={className}
		/>
	);
};

export default Media;
