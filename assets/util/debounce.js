/**
 * Debounce function
 *
 * Creates a debounced function that delays invoking the provided callback
 * until after the specified wait time has elapsed since the last time
 * the debounced function was invoked.
 *
 * @param {Function} callback The function to debounce
 * @param {number}   [wait=250] The number of milliseconds to delay
 * @return {Function} The debounced function
 * @version 1.0.0
 */
const debounce = (callback, wait = 250) => {
	let timeoutId = null;
	return (...args) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			callback(...args);
		}, wait);
	};
};
export default debounce;
