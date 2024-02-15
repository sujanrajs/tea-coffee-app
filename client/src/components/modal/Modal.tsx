import { ReactNode } from "react";
import "./modal.scss";
import { Button } from "../button";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	onSave: () => void;
	title: string;
	disabled?: boolean;
}

export const Modal: React.FunctionComponent<ModalProps> = ({
	isOpen,
	onClose,
	onSave,
	children,
	title,
	disabled,
}) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<h3>{title}</h3>
				{children}
				<div className="modal-footer-buttons">
					<Button
						ariaLabel={"Click me to close"}
						onClick={onClose}
						variant="text"
					>
						Close
					</Button>
					<Button
						ariaLabel={"Click me to save"}
						onClick={onSave}
						disabled={disabled}
					>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};
