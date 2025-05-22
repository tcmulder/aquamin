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

/**
 * Create a movement button.
 *
 * @param {Object}   props          Component properties.
 * @param {string}   props.label    Button label.
 * @param {Function} props.onClick  Button click handler.
 * @param {string}   props.children Button children.
 * @param {boolean}  props.disabled Whether or not the button is disabled.
 * @return {Object}                 Button render
 */
const MoveButton = (props) => {
	const { label, onClick, children, disabled } = props;
	return (
		<Button
			style={{ textDecoration: 'none' }}
			className="button button-small"
			type="button"
			aria-label={label}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</Button>
	);
};

/**
 * Change the order of things
 * @param {Object}   props                  Component props.
 * @param {Array}    props.chosen           Array of selected items.
 * @param {Array}    props.opt              Array of available options.
 * @param {Function} props.updateAttributes Function to update attributes with new order.
 * @return {Object}                         OrderChanger render
 */
const OrderChanger = (props) => {
	const { chosen, opt, updateAttributes } = props;
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
