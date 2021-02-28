import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Login.module.css';
import { signIn } from '../../actions/user';

const LoginPage = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailChange = evt => setEmail(evt.target.value)
    const onPasswordChange = evt => setPassword(evt.target.value)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(email, password))
    }
    return (
        <main className={styles.main}>
            <section id={"login"} className={styles.login}>
                <form onSubmit={onSubmit} className={styles.form}>
                    <h1 className={styles.title}>Bienvenido</h1>
                    <input onChange={onEmailChange} value={email} className={styles.input} placeholder={"Usuario"} type={"text"} />
                    <input onChange={onPasswordChange} value={password} className={styles.input} placeholder={"Contraseña"} type={"password"} />
                    <input className={styles.buttom} type={"submit"} value={"Ingresar"} />
                </form>
            </section>
        </main>
    )
}

export default LoginPage;