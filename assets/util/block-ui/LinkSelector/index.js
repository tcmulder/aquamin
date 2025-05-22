/**
 * Add link to block's floating toolbar.
 *
 * Example:
 *    const { link } = attributes; // { url: 'https://example.com', opensInNewTab: false, title: 'Button Title' }
 *    <LinkSelector
 *        link={link}
 *        setAttributes={setAttributes}
 *        show={isSelected}
 *    />
 */
import { link as linkIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	BlockControls,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	Popover,
	TextControl,
} from '@wordpress/components';

/**
 * Link selector
 * @param {Object}   props               Component props.
 * @param {Object}   props.link          Link object with url, title, and opensInNewTab properties.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @param {boolean}  props.show          Whether or not to show the link selector.
 */
const LinkSelector = (props) => {
	const { link, setAttributes, show } = props;
	const [showLink, setShowLink] = useState(false);
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						title={__('Edit link', 'aquamin')}
						icon={linkIcon}
						onClick={() => setShowLink(!showLink)}
						isActive={showLink}
					/>
				</ToolbarGroup>
			</BlockControls>
			{showLink && show ? (
				<Popover>
					<div style={{ margin: '16px' }}>
						<TextControl
							aria-label={__('Title', 'aquamin')}
							placeholder={__('Title', 'aquamin')}
							value={link.title}
							onChange={(value) =>
								setAttributes({
									link: { ...link, title: value },
								})
							}
						/>
					</div>
					<LinkControl
						aria-label={__('Url', 'aquamin')}
						placeholder={__('Title', 'aquamin')}
						onChange={(value) => {
							setAttributes({
								link: {
									...link,
									url: value.url,
									opensInNewTab: value.opensInNewTab,
								},
							});
						}}
						value={link}
					/>
				</Popover>
			) : null}
		</>
	);
};

export default LinkSelector;
