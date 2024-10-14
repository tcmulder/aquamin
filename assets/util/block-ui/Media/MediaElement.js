/**
 * Dependencies
 */
import classnames from 'classnames';
import { getHTMLAttributes, getType, getFocalStyles } from './media-util';

/**
 * Output actual media HTML to save
 * @param {Object}  root0
 * @param {Object}  root0.attributeNames
 * @param {Object}  root0.attributes
 * @param {Object}  root0.htmlAttributes
 * @param {string}  root0.className
 * @param {boolean} root0.editable
 */
export const MediaElement = ({
	attributeNames,
	attributes,
	htmlAttributes,
	className,
	editable,
}) => {
	const show = !editable;
	if (show) {
		const type = getType(attributes[attributeNames.url]);
		const focalStyles = getFocalStyles({
			focalX: attributes[attributeNames.focalX],
			focalY: attributes[attributeNames.focalY],
		});

		if (type === 'video' && attributes[attributeNames.url]) {
			return (
				// eslint-disable-next-line jsx-a11y/media-has-caption
				<video
					className={classnames('media', className)}
					src={attributes[attributeNames.url]}
					width={attributes[attributeNames.width]}
					height={attributes[attributeNames.height]}
					style={focalStyles}
					{...getHTMLAttributes(htmlAttributes, type)}
				/>
			);
		}
		if (type === 'image' && attributes[attributeNames.url]) {
			return (
				<img
					className={classnames('media', className)}
					src={attributes[attributeNames.url]}
					width={attributes[attributeNames.width]}
					height={attributes[attributeNames.height]}
					alt={attributes[attributeNames.alt]}
					style={focalStyles}
					{...getHTMLAttributes(htmlAttributes, type)}
				/>
			);
		}
	}

	return null;
};
