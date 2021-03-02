import React, { useEffect, useState } from 'react';
import styles from './User.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/user';

const UserPage = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.auth.users)
    const [userList, setUserList] = useState([])

    useEffect(() => {
        
        if (users.length > 0) {
            console.log("gggg",users)
            setUserList(users.map(user => {
                return (
                    <div className={styles.row}><div className={styles.item}>{user.name}</div>
                        <div className={styles.item}>{user.lastname}</div>
                        <div className={styles.item}>{user.email}</div>
                        <div className={styles.item}>{user.admin ? "Admin" : "Básico"}</div>
                    </div>)
            }
            ))
        } else {
            console.log("fff",users)
        }
    }, [users])

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <main className={styles.name}>
            <section className={styles.userSection}>
                <h1 className={styles.title}>Usuarios</h1>
                <button>Nuevo usuario</button>
                <div className={styles.table}>
                    <div className={styles.row}>
                        <div className={`${styles.item} ${styles.header}`}>Nombre</div>
                        <div className={`${styles.item} ${styles.header}`}>Apellido</div>
                        <div className={`${styles.item} ${styles.header}`}>Email</div>
                        <div className={`${styles.item} ${styles.header}`}>Perfil</div>
                    </div>
                    {userList}
                </div>
            </section>
        </main>
    )
}

export default UserPage;