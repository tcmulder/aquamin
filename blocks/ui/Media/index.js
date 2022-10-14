/**
 * Media component
 *
 * Handles image/video media.
 * 
 * Usage:

// add this to the block.json file:
{
	// ...other block settings
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
}

Then use it within the edit function like:
<Media
	editable
	setAttributes={setAttributes}
	attributes={attributes}
/>

And use it within the save function like:
<Media attributes={attributes} />

There's a lot of customization you can do as well:
<Media
	editable
	setAttributes={setAttributes}
	attributes={attributes}
	attributeNames = { // custom block.json props (defaults plus "Background" shown here)
		alt: 'mediaAltBackground',
		url: 'mediaUrlBackground',
		id: 'mediaIdBackground',
		width: 'mediaWidthBackground',
		height: 'mediaHeightBackground',
	},
	htmlAttributes={{ // extra HTML attributes (videos default to autoplay)
		video: {
			loop: '',
			muted: '',
			playsinline: '',
		},
		image: {
			loading: 'lazy',
		},
	}}
	title={__('Background Media', 'aquamin)}, // title above <MediaPlaceholder />
	className="my-extra-class" // comes with .media automatically
	accept={['image/*', 'video/*']} // or exclude a type
	allowedTypes={['image', 'video']} // or exclude a type
	style={{ height: 'auto' }} // useful for WP sidebar
/>

 *
 */

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
const ActualMedia = ({
	attributeNames,
	attributes,
	htmlAttributes,
	className,
	style,
}) => {
	const type = getType(attributes[attributeNames.url]);
	// add arbitrary extra html attributes (and default videos to autoplaying)
	const getHTMLAttributes = () =>
		// eslint-disable-next-line no-prototype-builtins, no-nested-ternary
		htmlAttributes?.hasOwnProperty(type)
			? htmlAttributes[type]
			: type === 'video'
			? { loop: '', autoPlay: '', muted: '', playsinline: '' }
			: null;
	if (type === 'video' && attributes[attributeNames.url]) {
		return (
			// eslint-disable-next-line jsx-a11y/media-has-caption
			<video
				className={classnames('media', className)}
				src={attributes[attributeNames.url]}
				width={attributes[attributeNames.width]}
				height={attributes[attributeNames.height]}
				style={style}
				{...getHTMLAttributes()}
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
				{...getHTMLAttributes()}
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
	htmlAttributes,
	className,
	style,
	editable,
	accept,
	allowedTypes,
}) => {
	const willAccept = accept || ['image/*', 'video/*'];
	const willAllowTypes = allowedTypes || ['image', 'video'];
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
					htmlAttributes={htmlAttributes}
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
				accept={willAccept}
				allowedTypes={willAllowTypes}
			/>
		);
	}

	return (
		<ActualMedia
			attributeNames={attributeNames}
			attributes={attributes}
			className={className}
			htmlAttributes={htmlAttributes}
		/>
	);
};

export default Media;
