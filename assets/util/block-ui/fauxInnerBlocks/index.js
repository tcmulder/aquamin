/**
 * Faux Inner Blocks
 *
 * This utility exposes inner blocks to the ServerSideRender component. It's necessary to do it like
 * this because ServerSideRender doesn't automatically include inner block content. By passing this
 * content as an attribute, the server-side rendering function can access and use the inner blocks content
 * in PHP. This ephemeral attribute isn't saved and is only used within the editor itself, not the front-end.
 *
 * @see https://wordpress.stackexchange.com/questions/385880/wp-blocks-gutenberg-serversiderender-not-rendering-content
 */

import { select } from '@wordpress/data';
import { getBlockContent } from '@wordpress/blocks';

/**
 * Get block content to pass into block editor context.
 *
 * Implementation steps:
 * 1. In your block.json, add a `fauxInnerBlocks` attribute:
 *    ```json
 *    "attributes": {
 *      "fauxInnerBlocks": {
 *        "type": "string"
 *      }
 *    }
 *    ```
 *
 * 2. In your block component, call getFauxInnerBlocks() to retrieve the editor's inner blocks:
 *    ```js
 *    const { clientId } = props;
 *    const fauxInnerBlocks = getFauxInnerBlocks(clientId);
 *    ```
 *
 * 3. Again in your block component, pass the content to ServerSideRender:
 *    ```js
 *    <ServerSideRender
 *      block="namespace/block-name"
 *      attributes={{
 *        ...attributes,
 *        fauxInnerBlocks,
 *      }}
 *    />
 *    ```
 *
 * 4. In your PHP render file, use the faux content if it exists (in the editor) or the normal $content if not (front-end):
 *    ```php
 *    $content = isset( $attributes['fauxInnerBlocks'] ) ? do_shortcode( do_blocks( $attributes['fauxInnerBlocks'] ) ) : $content;
 *    ```
 *
 * @param {string} clientId The client ID of the block from which to capture the inner blocks
 * @return {string}         The inner blocks content
 */
export const getFauxInnerBlocks = (clientId) => {
	const { getBlock } = select('core/block-editor');
	return getBlockContent(getBlock(clientId));
};

export default getFauxInnerBlocks;
