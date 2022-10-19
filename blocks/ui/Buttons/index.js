import { plus, close } from '@wordpress/icons';

const { __ } = wp.i18n;
const { Button } = wp.components;

export const ButtonIconized = ({ icon, label, show, handleClick, style }) =>
	show || show === undefined ? (
		<Button
			icon={icon}
			label={label}
			tooltipPosition="bottom"
			onClick={handleClick}
			className="aquamin-wp-button"
			style={style}
		/>
	) : null;

export const ButtonX = ({ show, handleClick, label, style }) => (
	<ButtonIconized
		icon={close}
		label={label || __('Remove', 'aquamin')}
		show={show}
		handleClick={handleClick}
		style={style}
	/>
);

export const ButtonPlus = ({ show, handleClick, label, style }) => (
	<ButtonIconized
		icon={plus}
		label={label || __('Add', 'aquamin')}
		show={show}
		handleClick={handleClick}
		style={style}
	/>
);
