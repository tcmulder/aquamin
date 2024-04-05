/* eslint-disable import/no-unresolved */

/**
 * Import select theme stylesheets
 *
 * This causes the editor to inherit
 * the theme's major styling features,
 * wrapped within .editor-styles-wrapper.
 */
import '../**/**theme.css';

/**
 * Block editor back-end styling
 *
 * All files within the assets directory ending
 * in "editor.css" get enqueued on the back-end of
 * the block editor, site-wide. All *.bundle.js files
 * like this get bundled into a single .css and .js
 * file in the dist/ directory.
 */
import '../**/**editor.css';
