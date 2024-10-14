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
} from '@wordpress/components';
import { MediaNewPlaceholder } from './MediaNewPlaceholder';
import { MediaElement } from './MediaElement';
import { getType } from './media-util';

/**
 * Alt text editor
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {Object}   props.attributeNames
 */
const AltControl = ({ attributes, setAttributes, attributeNames }) => {
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
 * Media editor types (new media, focal point, plain media iamge)
 * @param {Object} props
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
			</>
		);
	} else {
		return (
			<>
				<MediaElement {...props} style={{ height: 'auto' }} />
				<AltControl {...props} />
			</>
		);
	}
};

/**
 * Output inspector controls
 * @param {Object} props
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
