/**
 * My Block Media save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import Media from '../../util/block-ui/Media';

/**
 * Generate block HTML to save to the database
 * @param {Object} props
 * @param {Object} props.attributes
 * @param {string} props.className
 */
const MyBlockMediaBlockSave = ({ attributes, className }) => {
	// set props for the outermost block element
	const blockProps = useBlockProps.save({
		className: classnames('my-block-media', className),
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	// output the block's html
	return (
		<div {...innerBlocksProps}>
			<div>
				<h2>{__('Basic', 'aquamin')}</h2>
				<Media attributes={attributes} className="media-1" />
			</div>
			<div>
				<h2>{__('Custom', 'aquamin')}</h2>
				<Media
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
					style={{ outline: '1px solid lightgray' }} // add block editor css style attributes
					className="media-2 custom-media" // comes with .media automatically
				/>
			</div>
		</div>
	);
};
export default MyBlockMediaBlockSave;
