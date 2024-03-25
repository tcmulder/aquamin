/* eslint-disable import/no-unresolved */
/**
 * Load front-end scripts and styling common the the entire theme.
 */

/**
 * Core/global configurations
 */
import '../global/view.css';

/**
 * Individual components
 */
import '../component-library/*/*view.js';
import '../component-library/*/*view.css';

/**
 * Front-end overrides to existing blocks.
 */
import '../block-editor/*/*view.js';
import '../block-editor/*/*view.css';

/**
 * Stuff we don't wanna talk about...
 *
 * See file for notes. Added here to be last
 * in cascade.
 */
import '../global/shame.css';
