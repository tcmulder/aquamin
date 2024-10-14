/**
 * Dependencies
 */
import classnames from 'classnames';
import { MediaNewPlaceholder } from './MediaNewPlaceholder';
import { getHTMLAttributes, getType, getFocalStyles } from './media-util';

/**
 * Output actual media HTML to save
 * @param {Object} props All Media props
 */
export const MediaElement = (props) => {
	const {
		attributeNames,
		attributes,
		htmlAttributes,
		className,
		editable,
		style,
	} = props;
	const hasUrl = !!attributes[attributeNames.url];

	if (editable && !hasUrl) {
		return <MediaNewPlaceholder {...props} />;
	}

	const type = getType(attributes[attributeNames.url]);
	const focalStyles = getFocalStyles(attributes[attributeNames.focal]);

	if (type === 'image' && hasUrl) {
		return (
			<img
				className={classnames('media', className)}
				src={attributes[attributeNames.url]}
				width={attributes[attributeNames.width]}
				height={attributes[attributeNames.height]}
				alt={attributes[attributeNames.alt]}
				style={{ ...focalStyles, ...style }}
				{...getHTMLAttributes(htmlAttributes, type)}
			/>
		);
	} else if (type === 'video' && hasUrl) {
		return (
			// eslint-disable-next-line jsx-a11y/media-has-caption
			<video
				className={classnames('media', className)}
				src={attributes[attributeNames.url]}
				width={attributes[attributeNames.width]}
				height={attributes[attributeNames.height]}
				style={{ ...focalStyles, ...style }}
				{...getHTMLAttributes(htmlAttributes, type)}
			/>
		);
	}

	return null;
};
