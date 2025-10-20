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
 *            "mediaFocal": {
 *                "type": "object",
 *                "default": {
 *                    "x": 0.5,
 *                    "y": 0.5,
 *                    "objectFit": "cover"
 *                }
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
 *        editable // set to true if within edit function or leave off if in save function
 *        setAttributes={setAttributes} // setAttributes function from containing block
 *        attributes={attributes} // attributes from containing block
 *        attributeNames = {{
 *            // custom block.json prop names (e.g. mediaAlt1 and mediaAlt2 for two <Media />)
 *            // if you have two <Media /> use something like .media-1 and .media-2 for class names in block.json
 *            alt: 'mediaAlt',
 *            url: 'mediaUrl',
 *            id: 'mediaId',
 *            width: 'mediaWidth',
 *            height: 'mediaHeight',
 *            focal: 'mediaFocal',
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
 *        style={{ height: 'auto' }} // inline css styling
 *        accept={['image/*', 'video/*']} // or exclude a type
 *        allowedTypes={['image', 'video']} // or exclude a type
 *        hideInSidebar={true} // don't show this in block editor sidebar
 *    />
 */

/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaElement } from './MediaElement';
import { MediaBlockControls } from './MediaBlockControls';
import { MediaInspector } from './MediaInspector';

/**
 * Show media component
 * @param {Object} props All Media props
 */
const Media = (props) => (
	<>
		<MediaInspector {...props} />
		<MediaBlockControls {...props} />
		<MediaElement {...props} />
	</>
);

// establish sane defaults
Media.defaultProps = {
	title: __('Media', 'aquamin'),
	accept: ['image/*', 'video/*'],
	allowedTypes: ['image', 'video'],
	attributeNames: {
		alt: 'mediaAlt',
		url: 'mediaUrl',
		id: 'mediaId',
		width: 'mediaWidth',
		height: 'mediaHeight',
		focal: 'mediaFocal',
	},
};

export default Media;
