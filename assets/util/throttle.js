/**
 * Throttle function
 *
 * Creates a throttled function that only invokes the provided callback
 * at most once per specified time limit, ignoring subsequent calls within
 * the time limit.
 *
 * @param {Function} callback The function to throttle
 * @param {number}   [limit=250]    The time limit in milliseconds
 * @return {Function} The throttled function
 * @version 1.0.0
 */
const throttle = function (callback, limit=250) {
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
