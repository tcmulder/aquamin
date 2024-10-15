/**
 * Get HTML attributes
 *
 * @param {Object} htmlAttributes HTML attributes to parse
 * @param {string} type           Type of media (e.g. 'video' or 'image')
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
 *
 * @param {string} url URL of the media asset to evaluate
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
 *
 * @param {Object} focal           Focal parameters
 * @param {number} focal.x         Horizontal percentage focus
 * @param {number} focal.y         Vertical percentage focus
 * @param {string} focal.objectFit Object fit value (like "cover")
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

/**
 * Set the media object of Media
 *
 * @param {Object} value Selected gutenberg media object
 * @param {Object} props All Media props
 */
export const handleMediaSelect = (value, props) => {
	const { attributeNames, setAttributes } = props;
	setAttributes({
		[attributeNames.id]: value.id,
		[attributeNames.url]: value.url,
		[attributeNames.alt]: value.alt,
		[attributeNames.width]: value.width,
		[attributeNames.height]: value.height,
	});
};

/**
 * Set the URL of Media
 *
 * @param {Object} value Selected gutenberg media object
 * @param {Object} props All Media props
 */
export const handleURLSelect = (value, props) => {
	const { attributeNames, setAttributes } = props;
	setAttributes({
		[attributeNames.url]: value,
	});
};
