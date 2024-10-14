/**
 * Get HTML attributes
 * @param {Object} htmlAttributes
 * @param {string} type
 */
export const getHTMLAttributes = (htmlAttributes, type) => {
	// start with none
	let allAttributes = {};
	htmlAttributes?.forEach((attrObj) => {
		if (attrObj?.type === type) {
			// if this is the current media type then add html attributes
			allAttributes = {
				...allAttributes,
				...attrObj,
			};
		} else if (!attrObj.type) {
			// if this is for any media type add attributes
			allAttributes = {
				...allAttributes,
				...attrObj,
			};
		}
	});
	// if this is a video default to autoplay if no attributes given
	if (type === 'video' && allAttributes?.type !== 'video') {
		allAttributes = {
			...allAttributes,
			loop: '',
			muted: '',
			playsinline: '',
			autoplay: '',
		};
	}

	// delete type (if any) since it's not an html attribute
	delete allAttributes.type;

	return allAttributes;
};

/**
 * Get type of media
 * @param {string} url
 */
export const getType = (url) => {
	let type = 'image';
	if (url) {
		const ext = url
			.split('/')
			.pop()
			.split('#')[0]
			.split('?')[0]
			.split('.')
			.pop();
		if (['mp4', 'm4v', 'webm', 'ogv', 'flv'].includes(ext)) {
			type = 'video';
		} else if (['jpg', 'png', 'gif', 'jpeg', 'webp', 'svg'].includes(ext)) {
			type = 'image';
		}
	}
	return type;
};

/**
 * Get image focal point
 * @param {Object} root0
 * @param {number} root0.focalX
 * @param {number} root0.focalY
 */
export const getFocalStyles = ({ focalX, focalY }) => {
	let focalStyles = {};
	if (focalX && focalY) {
		focalStyles = {
			'--media-x': `${focalX * 100}%`,
			'--media-y': `${focalY * 100}%`,
			'--media-focal': 'cover',
		};
	}
	return focalStyles;
};
