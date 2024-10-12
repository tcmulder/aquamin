/**
 * Dependencies
 */
import classnames from 'classnames';
import { getHTMLAttributes, getType } from './util';

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

		// establish focal point
		let styles = {};
		const hasFocal = !!attributes[attributeNames.focalX];
		if (hasFocal) {
			styles = {
				'--media-x': `${attributes[attributeNames.focalX] * 100}%`,
				'--media-y': `${attributes[attributeNames.focalY] * 100}%`,
			};
		}

		if (type === 'video' && attributes[attributeNames.url]) {
			return (
				// eslint-disable-next-line jsx-a11y/media-has-caption
				<video
					className={classnames(
						'media',
						className,
						hasFocal ? 'media--focal' : '',
					)}
					src={attributes[attributeNames.url]}
					width={attributes[attributeNames.width]}
					height={attributes[attributeNames.height]}
					style={styles}
					{...getHTMLAttributes(htmlAttributes, type)}
				/>
			);
		}
		if (type === 'image' && attributes[attributeNames.url]) {
			return (
				<img
					className={classnames(
						'media',
						className,
						hasFocal ? 'media--focal' : '',
					)}
					src={attributes[attributeNames.url]}
					width={attributes[attributeNames.width]}
					height={attributes[attributeNames.height]}
					alt={attributes[attributeNames.alt]}
					style={styles}
					{...getHTMLAttributes(htmlAttributes, type)}
				/>
			);
		}
	}

	return null;
};
