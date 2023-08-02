const throttle = function (callback, limit) {
	let waiting = false;
	return function () {
		if (!waiting) {
			// eslint-disable-next-line prefer-rest-params
			callback.apply(this, arguments);
			waiting = true;
			setTimeout(() => {
				waiting = false;
			}, limit);
		}
	};
};

export default throttle;
