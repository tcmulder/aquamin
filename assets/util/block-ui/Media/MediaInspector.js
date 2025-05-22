/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextareaControl,
	ExternalLink,
	FocalPointPicker,
	Button,
} from '@wordpress/components';
import { MediaNewPlaceholder } from './MediaNewPlaceholder';
import { MediaElement } from './MediaElement';
import { getType } from './media-util';

/**
 * Alt text editor
 *
 * @param {Object}   props                All Media props
 * @param {Function} props.setAttributes  Function to change Media attributes
 * @param {Object}   props.attributeNames Object attribute names
 * @param {Object}   props.attributes     Media block attributes
 */
const AltControl = (props) => {
	const { attributes, setAttributes, attributeNames } = props;
	return getType(attributes[attributeNames.url]) !== 'video' ? (
		<div style={{ marginTop: 10, marginBottom: 10 }}>
			<TextareaControl
				label={__('Alt text (alternative text)', 'aquamin')}
				value={attributes[attributeNames.alt]}
				onChange={(value) =>
					setAttributes({
						[attributeNames.alt]: value,
					})
				}
				help={
					<>
						<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
							{__(
								'Describe the purpose of the image.',
								'aquamin',
							)}
						</ExternalLink>
						<br />
						{__('Leave empty if decorative.', 'aquamin')}
					</>
				}
			/>
		</div>
	) : null;
};

/**
 * Button for removing Media
 *
 * @param {Object}   props                All props
 * @param {Object}   props.title          Media title
 * @param {Function} props.setAttributes  Set Media block attributes
 * @param {Object}   props.attributeNames Custom/default attribute names
 */
const Remove = (props) => {
	const { setAttributes, attributeNames, title } = props;
	return (
		<Button
			variant="secondary"
			onClick={() => {
				setAttributes({
					[attributeNames.id]: 0,
					[attributeNames.url]: '',
					[attributeNames.alt]: '',
					[attributeNames.width]: 0,
					[attributeNames.height]: 0,
				});
			}}
		>
			{`${__('Replace', 'aquamin')} ${title}`}
		</Button>
	);
};

/**
 * Media editor types (new media, focal point, actual media asset)
 *
 * @param {Object}   props                All props
 * @param {Function} props.setAttributes  Set Media block attributes
 * @param {Object}   props.attributeNames Custom/default attribute names
 * @param {Object}   props.attributes     Media block attributes
 */
const MediaEditor = (props) => {
	const { attributes, attributeNames, setAttributes } = props;
	if (!attributes[attributeNames.url]) {
		<MediaNewPlaceholder {...props} />;
	} else if (attributes[attributeNames.focal]) {
		return (
			<>
				<FocalPointPicker
					url={attributes[attributeNames.url]}
					value={{
						x: attributes[attributeNames.focal].x,
						y: attributes[attributeNames.focal].y,
					}}
					onChange={(value) => {
						setAttributes({
							[attributeNames.focal]: {
								x: value.x,
								y: value.y,
								objectFit: 'cover',
							},
						});
					}}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<AltControl {...props} />
				<Remove {...props} />
			</>
		);
	} else {
		return (
			<>
				<MediaElement {...props} style={{ height: 'auto' }} />
				<AltControl {...props} />
				<Remove {...props} />
			</>
		);
	}
};

/**
 * Output inspector controls
 *
 * @param {Object}  props               All props
 * @param {string}  props.title         Media's name in the editor
 * @param {boolean} props.editable      Whether or not this is editable (i.e. edit/save)
 * @param {boolean} props.hideInSidebar Whether or not to hide inspector altogether
 */
export const MediaInspector = (props) => {
	const { title, hideInSidebar, editable } = props;
	if (editable && !hideInSidebar) {
		return (
			<InspectorControls group="styles">
				<PanelBody title={title}>
					<MediaEditor {...props} />
				</PanelBody>
			</InspectorControls>
		);
	}

	return null;
};
