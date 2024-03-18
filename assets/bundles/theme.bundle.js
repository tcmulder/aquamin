/* eslint-disable import/no-unresolved */
/**
 * Load front-end scripts and styling common the the entire theme.
 */

/**
 * Core/global configurations
 */
import '../global/style.css';

/**
 * Individual components
 */
import '../component-library/*/*script.js';
import '../component-library/*/*style.css';

/**
 * Front-end overrides to existing blocks.
 */
import '../block-editor/*/*script.js';
import '../block-editor/*/*style.css';

/**
 * Stuff we don't wanna talk about...
 *
 * See file for notes. Added here to be last
 * in cascade.
 */
import '../global/shame.css';
