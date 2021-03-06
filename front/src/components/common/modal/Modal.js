import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ children, visible }) => {
    return (
        <div className={styles.modal} style={{ display: visible ? "flex" : "none" }}>
            {children}
        </div>
    )
}

export default Modal;