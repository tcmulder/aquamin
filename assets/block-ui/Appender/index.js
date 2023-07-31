/**
 * Appender for sibling inner blocks.
 * 
 * Goes within the inner blocks, so they
 * can tell their parent to insert a new
 * block after their own index.
 *
 * Example:
 *
 *
import Appender from './Appender'
export const SomeInnerEditBlock = ({ clientId }) => (
	<Appender
		label={__('Add Inner Block', 'aquamin')}
		clientId={clientId}
		orientation="vertical" // defaults to "horizontal"
	/>
)
 */
import classnames from 'classnames';
import { ButtonPlus } from '../Buttons';

const { __ } = wp.i18n;
const { useSelect, dispatch, select } = wp.data;
const { createBlock } = wp.blocks;

const Appender = ({ clientId, label, show, orientation }) => {
	const block = select('core/block-editor').getBlock(clientId);
	const parentBlock = select('core/block-editor')
		.getBlockParents(clientId)
		.at(-1);
	const { index } = useSelect(() => {
		const { getBlockIndex } = select('core/block-editor');
		return {
			index: getBlockIndex(clientId) + 1,
		};
	});
	const labelText =
		label || `${__('Add Block', 'lift-the-label')} (${block.name})`;

	return (
		<div
			className={classnames(
				'aquamin-appender',
				`aquamin-appender--${orientation || 'horizontal'}`
			)}
			data-name={labelText}
		>
			{dispatch('core/editor') && (
				<div className="aquamin-appender__inner">
					<ButtonPlus
						label={labelText}
						show={show}
						handleClick={() => {
							dispatch('core/editor').insertBlock(
								createBlock(block.name),
								index,
								parentBlock
							);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default Appender;
