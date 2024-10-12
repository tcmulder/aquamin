/**
 * Media component
 *
 * Handles image/video media.
 *
 * Usage:
 *    // add this to the block.json file:
 *    {
 *        // ...other block settings
 *        "attributes": {
 *            "mediaId": {
 *                "type": "number",
 *                "default": 0
 *            },
 *            "mediaAlt": {
 *                "type": "string",
 *                "source": "attribute",
 *                "selector": ".media",
 *                "attribute": "alt"
 *            },
 *            "mediaUrl": {
 *                "type": "string",
 *                "source": "attribute",
 *                "selector": ".media",
 *                "attribute": "src"
 *            },
 *            "mediaWidth": {
 *                "type": "number"
 *            },
 *            "mediaHeight": {
 *                "type": "number"
 *            },
 *            "mediaFocalX": {
 *                "type": "number",
 *                "default": 0.5
 *            },
 *            "mediaFocalY": {
 *                "type": "number",
 *                "default": 0.5
 *            },
 *        }
 *    }
 * Then use it within the edit function like:
 *    <Media
 *        editable
 *        setAttributes={setAttributes}
 *        attributes={attributes}
 *    />
 * And use it within the save function like:
 *    <Media attributes={attributes} />
 * There's a lot of customization you can do as well:
 *    <Media
 *        editable
 *        setAttributes={setAttributes}
 *        attributes={attributes}
 *        showFocal={true} // show object fit focal point controls (don't need mediaFocalX or Y if false)
 *        attributeNames = {{
 *            // custom block.json prop names (e.g. mediaAlt1 and mediaAlt2 for two <Media />)
 *            // if you have two <Media /> use something like .media-1 and .media-2 for class names in block.json
 *            alt: 'mediaAlt',
 *            url: 'mediaUrl',
 *            id: 'mediaId',
 *            width: 'mediaWidth',
 *            height: 'mediaHeight',
 *            focalX: 'mediaFocalX',
 *            focalY: 'mediaFocalY',
 *        }}
 *        htmlAttributes={[
 *            {
 *                // apply html attributes to all media types
 *                width: 800,
 *                height: 600
 *            },
 *            {
 *                // apply html attribute to image media
 *                type: 'image',
 *                loading: 'lazy',
 *            },
 *            {
 *                // apply html attributes to video media (defaults to autplaying otherwise)
 *                type: 'video',
 *                controls: '',
 *            },
 *        ]}
 *        title={__('Background Media', 'aquamin')} // title above <MediaPlaceholder />
 *        className="my-extra-class" // comes with .media automatically
 *        accept={['image/*', 'video/*']} // or exclude a type
 *        allowedTypes={['image', 'video']} // or exclude a type
 *        hideInSidebar={true} // don't show this in block editor sidebar
 *    />
 */

/**
 * Dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextareaControl,
	FocalPointPicker,
} from '@wordpress/components';
import { ButtonX } from '../Buttons';
import { MediaElement } from './MediaElement';
import { getType } from './util';

/**
 * Output inspector controls
 * @param {Object} props
 */
const MediaInspector = (props) => {
	const {
		title,
		hideInSidebar,
		editable,
		attributes,
		attributeNames,
		setAttributes,
	} = props;
	const show = editable && !hideInSidebar;
	return show ? (
		<InspectorControls group="styles">
			<PanelBody title={title}>
				<MediaSidebar {...props} style={{ height: 'auto' }} />
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
 * Output existing media editor
 * @param {Object} props
 */
const MediaSidebar = (props) => {
	const { attributeNames, attributes, setAttributes, editable, showFocal } =
		props;
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
							[attributeNames.focalX]: '',
							[attributeNames.focalY]: '',
						})
					}
					style={{
						position: 'absolute',
						zIndex: '10',
						border: '2px solid currentColor',
					}}
				/>
			</div>
			{showFocal ? (
				<FocalPointPicker
					url={attributes[attributeNames.url]}
					value={{
						x: attributes[attributeNames.focalX],
						y: attributes[attributeNames.focalY],
					}}
					onChange={(value) => {
						setAttributes({
							[attributeNames.focalX]: value.x,
							[attributeNames.focalY]: value.y,
						});
					}}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			) : (
				<MediaElement {...props} editable={false} />
			)}
		</>
	) : null;
};

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
const MediaNew = ({
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

/**
 * Show media component
 * @param {Object} props
 */
const Media = (props) => (
	<>
		<MediaInspector {...props} />
		<MediaSidebar {...props} showFocal={false} />
		<MediaNew {...props} />
		<MediaElement {...props} />
	</>
);
Media.defaultProps = {
	title: __('Media Upload', 'aquamin'),
	accept: ['image/*', 'video/*'],
	allowedTypes: ['image', 'video'],
	showFocal: true,
	attributeNames: {
		alt: 'mediaAlt',
		url: 'mediaUrl',
		id: 'mediaId',
		width: 'mediaWidth',
		height: 'mediaHeight',
		focalX: 'mediaFocalX',
		focalY: 'mediaFocalY',
	},
};

export default Media;
