/**
 * Change the order of entities
 *
 * NOTE: this is only necessary since we can't reorder the
 * built in FormTokenField.
 *
 * @see https://github.com/WordPress/gutenberg/issues/22048
 */

/**
 * Import dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

const MoveButton = ({ label, onClick, children, disabled }) => (
	<Button
		style={{ textDecoration: 'none' }}
		className="button button-small"
		type="button"
		aria-label={label}
		isLink
		onClick={onClick}
		disabled={disabled}
	>
		{children}
	</Button>
);

/**
 * Change the order of things
 * @param {Object}   props
 * @param {Array}    props.chosen
 * @param {Array}    props.opt
 * @param {Function} props.updateAttributes
 */
const OrderChanger = ({ chosen, opt, updateAttributes }) => {
	const changeOrder = (fromIndex, toIndex) => {
		const orderChosen = [...chosen];
		const item = orderChosen[fromIndex];
		orderChosen.splice(fromIndex, 1);
		orderChosen.splice(toIndex, 0, item);
		updateAttributes(orderChosen);
	};
	return (
		<ul
			style={{
				maxHeight: '13rem',
				overflowY: 'auto',
				border: '1px solid var(--wp-admin-theme-color, #007cba)',
			}}
		>
			{chosen.map((choice, i) => {
				const nameFromId = opt.find((o) => o.value === choice)?.title;
				return (
					<li
						key={choice}
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<MoveButton
							index={i}
							onClick={() => changeOrder(i, i - 1)}
							label={__('Move Up', 'aquamin')}
							disabled={i === 0}
						>
							⬆
						</MoveButton>
						<MoveButton
							index={i}
							onClick={() => changeOrder(i, i + 1)}
							label={__('Move Down', 'aquamin')}
							disabled={i === chosen.length - 1}
						>
							⬇
						</MoveButton>
						<span style={{ paddingLeft: '0.5rem' }} title={choice}>
							{nameFromId}
						</span>
					</li>
				);
			})}
		</ul>
	);
};

export default OrderChanger;
