import React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "text";
	ariaLabel: string;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	disabled,
	ariaLabel,
	variant = "primary",
	...rest
}) => {
	return (
		<button
			aria-label={ariaLabel}
			disabled={disabled}
			className={`button button-${variant}`}
			{...rest}
		>
			{children}
		</button>
	);
};
