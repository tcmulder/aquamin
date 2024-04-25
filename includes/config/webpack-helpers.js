// @see: https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dependency-extraction-webpack-plugin/
/**
 * External dependencies
 */
const { getWordPressSrcDirectory } = require('@wordpress/scripts/utils/config');
const { fromProjectRoot } = require('@wordpress/scripts/utils/file');

const { sep } = require('path');

// jquery --> window.jQuery
// react-dom --> window.ReactDOM
const externalScriptsMap = {
	//'slick-carousel' : ['Slick'],
};

// @babel/runtime/regenerator --> wp-polyfill
const scriptHandleMap = {
	//'slick-carousel' : 'slick-carousel',
};

const externalModulesMap = {
	// static import.
	//'@wordpress/interactivity': 'module @wordpress/interactivity',
	// dynamic import.
	//'@wordpress/interactivity-router': 'import @wordpress/interactivity-router',
};

/**
 * Default request to global transformation
 *
 * Transform @wordpress dependencies:
 * - request `@wordpress/api-fetch` becomes `[ 'wp', 'apiFetch' ]`
 * - request `@wordpress/i18n` becomes `[ 'wp', 'i18n' ]`
 *
 * @param {string} request Module request (the module name in `import from`) to be transformed
 * @return {string|string[]|undefined} The resulting external definition. Return `undefined`
 *   to ignore the request. Return `string|string[]` to map the request to an external.
 */
function requestToExternal(request) {
	if (externalScriptsMap[request]) {
		return externalScriptsMap[request];
	}
}

/**
 * Default request to WordPress script handle transformation
 *
 * Transform @wordpress dependencies:
 * - request `@wordpress/i18n` becomes `wp-i18n`
 * - request `@wordpress/escape-html` becomes `wp-escape-html`
 *
 * @param {string} request Module request (the module name in `import from`) to be transformed
 * @return {string|undefined} WordPress script handle to map the request to. Return `undefined`
 *   to use the same name as the module.
 */
function requestToHandle(request) {
	if (scriptHandleMap[request]) {
		return scriptHandleMap[request];
	}
}

/**
 * Default request to external module transformation
 *
 * Currently Supports:
 * - @wordpress/interactivity
 * - @wordpress/interactivity-router
 *
 * Do not use the boolean shorthand here, it's only handled for the
 * `requestToExternalModule` option.
 *
 * @param {string} request Module request (the module name in `import from`) to be transformed
 * @return {string|Error|undefined} The resulting external definition.
 *   - Return `undefined` to ignore the request (do not externalize).
 *   - Return `string` to map the request to an external.
 *   - Return `Error` to emit an error.
 */
function requestToExternalModule(request) {
	if (externalModulesMap[request]) {
		return externalModulesMap[request];
	}
}

function getFile(fileName) {
	return fromProjectRoot(getWordPressSrcDirectory() + sep + fileName);
}

function getWebPackAlias() {
	return {
		//'@storepress/icons': getFile('packages/icons'),
		//'@storepress/utils': getFile('packages/utils'),
		//'@storepress/components': getFile('packages/components'),
	};
}

module.exports = {
	getFile,
	getWebPackAlias,
	requestToExternal,
	requestToHandle,
	requestToExternalModule,
};
