/* eslint-disable react/prop-types */
/**
 * WordPress dependencies
 */
/**
 * Internal dependencies
 */
import { ButtonPlus } from '../Buttons';

import './editor.css';

const { __ } = wp.i18n;
const { useSelect, dispatch, select } = wp.data;
const { createBlock } = wp.blocks;

const Appender = ({ clientId, label, show }) => {
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

	return (
		<div className="aquamin-appender">
			{dispatch('core/editor') && (
				<div className="aquamin-appender__inner">
					<ButtonPlus
						label={
							label ||
							`${__('Add Block', 'aquamin')} (${block.name})`
						}
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
