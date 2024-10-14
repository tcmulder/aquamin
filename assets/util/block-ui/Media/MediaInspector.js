/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';
import { MediaEditor } from './MediaEditor';
import { MediaNewPlaceholder } from './MediaNewPlaceholder';
import { getType } from './media-util';

/**
 * Output inspector controls
 * @param {Object} props
 */
export const MediaInspector = (props) => {
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
				<MediaEditor {...props} style={{ height: 'auto' }} />
				<MediaNewPlaceholder {...props} />
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
