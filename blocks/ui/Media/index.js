/**
 * Dependencies
 */
import { ButtonX } from '../Buttons';
import parseNestedProps from '../../util/parse-nested-props';

const { __ } = wp.i18n;
const { MediaPlaceholder } = wp.blockEditor;

/**
 * Videos and images renderer
 */
const ActualMedia = ({ attribute, className, style }) => {
	if (attribute?.type === 'video' && attribute?.url) {
		return (
			// eslint-disable-next-line jsx-a11y/media-has-caption
			<video
				src={attribute?.url}
				className={className}
				loop=""
				autoPlay=""
				muted=""
				playsinline=""
				mute=""
				width={attribute?.width}
				height={attribute?.height}
				style={style}
			/>
		);
	}
	if (attribute?.type === 'image' && attribute?.url) {
		return (
			<img
				src={attribute?.url}
				alt={attribute?.alt}
				width={attribute?.width}
				height={attribute?.height}
				className={className}
				style={style}
			/>
		);
	}

	return null;
};

/**
 * Basic video adder
 */
const Media = ({
	nestedMedia,
	title,
	className,
	style,
	editable,
	isSelected,
	accept,
	allowedTypes,
}) => {
	// get the original name/value of the parent's prop
	const { nestedAttribute, nestedSetAttribute } =
		parseNestedProps(nestedMedia);
	if (editable && nestedAttribute?.url) {
		return (
			<>
				<ButtonX
					show={isSelected}
					handleClick={() => nestedSetAttribute({})}
				/>
				<ActualMedia
					attribute={nestedAttribute}
					className={className}
					style={style}
				/>
			</>
		);
	}
	if (editable) {
		return (
			<MediaPlaceholder
				className={className}
				style={style}
				labels={{
					title:
						title ||
						__(
							'Media Upload',
							'Slide aquaminwithin a blurb carousel.'
						),
				}}
				value={nestedAttribute?.id}
				onSelectURL={(value) => {
					const ext = value.split('.').pop();
					let type = null;
					if (
						['jpg', 'png', 'gif', 'jpeg', 'webp', 'svg'].includes(
							ext
						)
					) {
						type = 'image';
					} else if (
						['mp4', 'm4v', 'webm', 'ogv', 'flv'].includes(ext)
					) {
						type = 'video';
					}
					return nestedSetAttribute({
						url: value,
						type,
					});
				}}
				onSelect={(value) =>
					nestedSetAttribute({
						id: value.id,
						url: value.url,
						alt: value.alt,
						type: value.type,
						width: value.width,
						height: value.height,
					})
				}
				accept={accept || ['image/*', 'video/*']}
				allowedTypes={allowedTypes || ['image', 'video']}
			/>
		);
	}

	return <ActualMedia attribute={nestedAttribute} className={className} />;
};

export default Media;
