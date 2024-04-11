/**
 * Limit number of inner blocks that can be appended
 *
 * Returns `null`, which shows Gutenberg's built in
 * appender, until the limit is reached; then, returns
 * `false` which prevents the appender from showing.
 *
 * Example:
 *
 *    import limitAppender from './limitAppender'
 *    export const SomeEditBlock = ({ clientId }) => (
 *        <InnerBlocks
 *            renderAppender={limitAppender(5, clientId)}
 *        />
 *    )
 */
import { select } from '@wordpress/data';

const limitAppender = (limit, clientId) => {
	const parentBlock = select('core/editor')
		.getBlocksByClientId(clientId)
		.at(-1);
	const childBlocks = parentBlock ? parentBlock.innerBlocks : [];
	return childBlocks.length < limit ? null : false;
};

export default limitAppender;
