/**
 * Dependencies
 */
import { link as linkIcon } from '@wordpress/icons';

const { __ } = wp.i18n;
const { useState } = wp.element;
const { BlockControls, __experimentalLinkControl: LinkControl } =
	wp.blockEditor;
const { ToolbarGroup, ToolbarButton, Popover, TextControl } = wp.components;

/**
 * Link selector
 */
const LinkSelector = ({ link, setAttributes, show }) => {
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
