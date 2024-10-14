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
 * @param {Object} focal Focal parameters
 */
export const getFocalStyles = (focal) => {
	let focalStyles = {};
	if (focal) {
		focalStyles = {
			'--media-x': `${focal.x * 100}%`,
			'--media-y': `${focal.y * 100}%`,
			'--media-focal': focal.objectFit,
		};
	}
	return focalStyles;
};
