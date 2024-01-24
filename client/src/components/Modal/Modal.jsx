import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import PropType from 'prop-types';

const Modal = ({ isOpen, onClose, onConfirm, message, buttonTitle }) => {
	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className={classes.overlay}>
			<div className={classes.modal}>
				<p>{message}</p>
				<div className={classes['modal__buttons']}>
					<button onClick={onConfirm}>{buttonTitle}</button>
					<button onClick={onClose}>Cancel</button>
				</div>
			</div>
		</div>,
		document.getElementById('root'),
	);
};

Modal.propTypes = {
	isOpen: PropType.bool.isRequired,
	onClose: PropType.func.isRequired,
	onConfirm: PropType.func.isRequired,
	message: PropType.string.isRequired,
	buttonTitle: PropType.string.isRequired,
};

export default Modal;