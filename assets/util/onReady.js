/**
 * Fire function on DOM ready
 *
 * This implementation is coming from https://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
 *
 * @param {Function} fn Callback function to run.
 */
const onReady = (fn) => {
	if (typeof fn !== 'function') {
		return;
	}
	if (
		document.readyState === 'interactive' ||
		document.readyState === 'complete'
	) {
		return fn();
	}
	document.addEventListener('DOMContentLoaded', fn, false);
};

export default onReady;
