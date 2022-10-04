/**
 * Copyright Year editor interface
 *
 * This defines how the child block works
 * within the back-end block editor.
 */

/**
 * Import dependencies
 */
const { serverSideRender: ServerSideRender } = wp;

/**
 * Generate block editor component
 */
const CopyrightYearEdit = () => (
	<ServerSideRender block="aquamin/copyright-year" />
);
export default CopyrightYearEdit;
