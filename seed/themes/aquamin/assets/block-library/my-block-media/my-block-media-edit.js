/**
 * My Block Media editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import Media from '../../util/block-ui/Media';

/**
 * Generate block editor component
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {string}   props.className
 */
const MyBlockMediaBlockEdit = ({ attributes, setAttributes, className }) => {
	// set props for the outermost block element
	const blockProps = useBlockProps({
		className: classnames('my-block-media', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			[
				'core/paragraph',
				{ placeholder: __('My Block Media inner blocks', 'aquamin') },
			],
		],
	});

	return (
		<div {...innerBlocksProps}>
			<div>
				<h2>{__('Basic', 'aquamin')}</h2>
				<Media
					editable
					setAttributes={setAttributes}
					attributes={attributes}
					hideInSidebar={true} // is false by default but want to test custom values below
					hidePlaceholder={true} // is false by default but want to test custom values below
					className="media-1" // to differentiate from other .media element
				/>
			</div>
			<div>
				<h2>{__('Custom', 'aquamin')}</h2>
				<Media
					editable
					setAttributes={setAttributes}
					attributes={attributes}
					attributeNames={{
						// custom block.json prop names (e.g. mediaAlt1 and mediaAlt2 for two <Media />)
						alt: 'mediaAlt2',
						url: 'mediaUrl2',
						id: 'mediaId2',
						width: 'mediaWidth2',
						height: 'mediaHeight2',
						focal: 'mediaFocal2',
					}}
					htmlAttributes={[
						{
							// apply html attributes to all media types
							width: 1920,
							height: 1080,
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
					title={__('Custom Media', 'aquamin')} // title above <MediaPlaceholder />
					className="media-2" // comes with .media automatically
					accept={['image/*']} // or exclude a type
					allowedTypes={['image']} // or exclude a type
					style={{ outline: '1px solid lightgray' }} // add block editor css style attributes
					hideInSidebar={false} // don't show this in block editor sidebar
					hideInBlockControls={true} // don't add block controls
				/>
			</div>
		</div>
	);
};
export default MyBlockMediaBlockEdit;
