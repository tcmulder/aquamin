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
		"mediaId": {
			"type": "number",
			"default": 0
		},
		"mediaAlt": {
			"type": "string",
			"source": "attribute",
			"selector": ".media",
			"attribute": "alt"
		},
		"mediaUrl": {
			"type": "string",
			"source": "attribute",
			"selector": ".media",
			"attribute": "src"
		},
		"mediaWidth": {
			"type": "number"
		},
		"mediaHeight": {
			"type": "number"
		},
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
	attributeNames = {{ // custom block.json props (defaults plus "Background" shown here)
		alt: 'mediaAltBackground',
		url: 'mediaUrlBackground',
		id: 'mediaIdBackground',
		width: 'mediaWidthBackground',
		height: 'mediaHeightBackground',
	}}
	htmlAttributes={[
		{
			// apply html attributes to all media types
			width: 800,
			height: 600
		},
		{
			// apply html attribute to image media
			type: 'image',
			loading: 'lazy',
		},
		{
			// apply html attributes to video media (defaults to autplaying otherwise)
			type: 'video',
			controls: '',
		},
	]}
	title={__('Background Media', 'aquamin')}, // title above <MediaPlaceholder />
	className="my-extra-class" // comes with .media automatically
	accept={['image/*', 'video/*']} // or exclude a type
	allowedTypes={['image', 'video']} // or exclude a type
	style={{ height: 'auto' }} // add css style attributes
	hideInSidebar={true} // don't show this in block editor sidebar
/>

 *
 */

/**
 * Dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';
import { ButtonX } from '../Buttons';

/**
 * Get type of media
 */
const getType = (url) => {
	let type = 'image';
	if (url) {
		const ext = url
			.split('/')
			.pop()
			.split('#')[0]
			.split('?')[0]
			.split('.')
			.pop();
		if (['mp4', 'm4v', 'webm', 'ogv', 'flv'].includes(ext)) {
			type = 'video';
		} else if (['jpg', 'png', 'gif', 'jpeg', 'webp', 'svg'].includes(ext)) {
			type = 'image';
		}
	}
	return type;
};

/**
 * Get HTML attributes
 */
const getHTMLAttributes = (htmlAttributes, type) => {
	// start with none
	let allAttributes = {};
	htmlAttributes?.forEach((attrObj) => {
		if (attrObj?.type === type) {
			// if this is the current media type then add html attributes
			allAttributes = {
				...allAttributes,
				...attrObj,
			};
		} else if (!attrObj.type) {
			// if this is for any media type add attributes
			allAttributes = {
				...allAttributes,
				...attrObj,
			};
		}
	});
	// if this is a video default to autoplay if no attributes given
	if (type === 'video' && allAttributes?.type !== 'video') {
		allAttributes = {
			...allAttributes,
			loop: '',
			muted: '',
			playsinline: '',
			autoplay: '',
		};
	}

	// delete type (if any) since it's not an html attribute
	delete allAttributes.type;

	return allAttributes;
};

/**
 * Output inspector controls
 */
const MediaInspector = (props) => {
	const {
		title,
		hideInSidebar,
		style,
		editable,
		attributes,
		attributeNames,
		setAttributes,
	} = props;
	const show = editable && !hideInSidebar;
	return show ? (
		<InspectorControls group="styles">
			<PanelBody title={title}>
				<MediaEdit {...props} style={{ ...style, height: 'auto' }} />
				<MediaNew {...props} />
				{getType(attributes[attributeNames.url]) !== 'video' && (
					<div style={{ marginTop: 10 }}>
						<TextareaControl
							label={__('Alt text (alternative text)', 'aquamin')}
							style={{ marginBottom: -15 }}
							value={attributes[attributeNames.alt]}
							onChange={(value) =>
								setAttributes({
									[attributeNames.alt]: value,
								})
							}
						/>
						<p>
							{__(
								'Describe the purpose of the image. Leave empty if the image is purely decorative.',
								'aquamin',
							)}
							{` `}
							<a
								href="https://www.w3.org/WAI/tutorials/images/decision-tree/"
								target="_blank"
								rel="noreferrer"
							>
								{__('What is alt text?', 'aquamin')}
							</a>
						</p>
					</div>
				)}
			</PanelBody>
		</InspectorControls>
	) : null;
};

/**
 * Output actual media HTML to save
 */
const MediaElement = ({
	attributeNames,
	attributes,
	htmlAttributes,
	className,
	style,
	editable,
}) => {
	const show = !editable;
	if (show) {
		const type = getType(attributes[attributeNames.url]);
		if (type === 'video' && attributes[attributeNames.url]) {
			return (
				// eslint-disable-next-line jsx-a11y/media-has-caption
				<video
					className={classnames('media', className)}
					src={attributes[attributeNames.url]}
					width={attributes[attributeNames.width]}
					height={attributes[attributeNames.height]}
					style={style}
					{...getHTMLAttributes(htmlAttributes, type)}
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
					alt={attributes[attributeNames.alt]}
					style={style}
					{...getHTMLAttributes(htmlAttributes, type)}
				/>
			);
		}
	}

	return null;
};

/**
 * Output existing media editor
 */
const MediaEdit = (props) => {
	const { attributeNames, attributes, setAttributes, editable } = props;
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
						})
					}
					style={{
						position: 'absolute',
						zIndex: '10',
						border: '2px solid currentColor',
					}}
				/>
			</div>
			<MediaElement {...props} editable={false} />
		</>
	) : null;
};

/**
 * Output new media adder
 */
const MediaNew = ({
	className,
	style,
	title,
	attributes,
	attributeNames,
	setAttributes,
	accept,
	allowedTypes,
	editable,
}) => {
	const show = editable && !attributes[attributeNames.url];
	return show ? (
		<MediaPlaceholder
			disableDropZone={false}
			className={classnames('media', className)}
			style={style}
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

/**
 * Show media component
 */
const Media = (props) => (
	<>
		<MediaInspector {...props} />
		<MediaEdit {...props} />
		<MediaNew {...props} />
		<MediaElement {...props} />
	</>
);
Media.defaultProps = {
	title: __('Media Upload', 'aquamin'),
	accept: ['image/*', 'video/*'],
	allowedTypes: ['image', 'video'],
	attributeNames: {
		alt: 'mediaAlt',
		url: 'mediaUrl',
		id: 'mediaId',
		width: 'mediaWidth',
		height: 'mediaHeight',
	},
};

export default Media;
