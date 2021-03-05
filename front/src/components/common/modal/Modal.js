import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ children, onClick }) => {
    return (
        <div className={styles.modal} onClick={onClick}>
            {children}
        </div>
    )
}

export default Modal;