/* eslint-disable react/prop-types */
import { plus, close } from '@wordpress/icons';

const { __ } = wp.i18n;
const { Button } = wp.components;

export const ButtonIconized = ({ icon, label, show, handleClick }) =>
	show || show === undefined ? (
		<Button
			icon={icon}
			label={label}
			tooltipPosition="bottom"
			onClick={handleClick}
			className="aquamin-wp-button"
		/>
	) : null;

export const ButtonX = ({ show, handleClick, label }) => (
	<ButtonIconized
		icon={close}
		label={label || __('Remove', 'aquamin')}
		show={show}
		handleClick={handleClick}
	/>
);

export const ButtonPlus = ({ show, handleClick, label }) => (
	<ButtonIconized
		icon={plus}
		label={label || __('Add', 'aquamin')}
		show={show}
		handleClick={handleClick}
	/>
);
