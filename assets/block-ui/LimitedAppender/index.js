/**
 * Limit number of inner blocks that can be appended.
 *
 * Example:
 *
 *
import LimitedAppender from './LimitedAppender'
export const SomeEditBlock = ({ clientId }) => (
	<InnerBlocks
		renderAppender={() => <LimitedAppender limit={6} clientId={clientId} />}
	/>
)
 */
const { select } = wp.data;
const { InnerBlocks } = wp.blockEditor;

const LimitedAppender = ({ limit, clientId }) => {
	const parentBlock = select('core/editor').getBlocksByClientId(clientId)[0];
	const childBlocks = parentBlock ? parentBlock.innerBlocks : [];
	return childBlocks.length < limit ? (
		<InnerBlocks.ButtonBlockAppender />
	) : null;
};

export default LimitedAppender;
