import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const user = useSelector(state => state.auth.user)
    return (
        <header className={styles.header}>
            <Link to={'/contact'} className={styles.logo}>LOGO</Link>
            <nav className={styles.nav} style={{ display: user ? "block" : "none" }}>
                <Link to={'/contact'} className={styles.link}>Contactos</Link>
                <Link to={'/company'} className={styles.link}>Compañias</Link>
                {user && user.admin && <Link to={'/user'} className={styles.link}>Usuarios</Link>}
                <Link to={'/region'} className={styles.link}>Region/Ciudad</Link>
            </nav>
        </header>
    )
}

export default Header