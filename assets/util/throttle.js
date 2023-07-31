const throttle = function (callback, limit) {
	let waiting = false;
	return function () {
		if (!waiting) {
			callback.apply(this, arguments);
			waiting = true;
			setTimeout(() => {
				waiting = false;
			}, limit);
		}
	};
};

export default throttle;
