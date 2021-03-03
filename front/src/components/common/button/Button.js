import React from 'react';
import styles from './Button.module.css'

const Button = ({ func, title }) => {
    return <input className={styles.button} onClick={func} value={title} type={"submit"}/>
}

export default Button