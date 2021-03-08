import React from 'react';
import styles from './Button.module.css'

const Button = ({ func, title, color }) => {
    return <input className={styles.button} style={{ color: color}} onClick={func} value={title} type={"submit"}/>
}

export default Button