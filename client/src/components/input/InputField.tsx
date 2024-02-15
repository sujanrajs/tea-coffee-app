import React, { ChangeEvent } from "react";
import "./InputField.scss";

interface InputFieldProps {
	label?: string;
	type: string;
	value: string | number;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	inputLabelName: string;
	ariaLabel: string;
}

export const InputField: React.FunctionComponent<InputFieldProps> = ({
	label,
	type,
	value,
	onChange,
	placeholder,
	inputLabelName,
	ariaLabel,
}) => {
	return (
		<div className="input-field">
			<label htmlFor={inputLabelName}>{label}</label>
			<input
				type={type}
				aria-label={ariaLabel}
				name={inputLabelName}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
};
