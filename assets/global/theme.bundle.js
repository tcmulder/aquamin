/* eslint-disable import/no-unresolved */
/**
 * Theme-wide scripts and styles
 *
 * All files within the assets directory ending
 * in "theme.js" or "theme.css" get enqueued on
 * the front-end of the website, site-wide.
 * All *.bundle.js files like this get bundled into
 * a single .css and .js file in the dist/ directory.
 */
import '../**/**theme.css';
import '../**/**theme.js';

/**
 * Stuff we don't wanna talk about...
 *
 * See file for notes. Added here to be last
 * in cascade. Loaded site-wide.
 */
import './shame.css';
