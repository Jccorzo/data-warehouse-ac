import React from 'react';
import styles from './Button.module.css'

const Button = ({ func, title, style }) => {
    return <input className={styles.button} style={style} onClick={func} value={title} type={"submit"} />
}

export default Button