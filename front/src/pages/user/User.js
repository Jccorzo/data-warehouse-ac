import React, { useEffect, useState } from 'react';
import styles from './User.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/user';
import Button from '../../components/common/button/Button';

const UserPage = () => {
    const dispatch = useDispatch()
    const { users, user } = useSelector(state => state.auth)
    const [userList, setUserList] = useState([])

    useEffect(() => {
        if (users.length > 0) {
            setUserList(users.map(userS => {
                return (
                    <div className={styles.row}><div className={styles.item}>{userS.name}</div>
                        <div className={styles.item}>{userS.lastname}</div>
                        <div className={styles.item}>{userS.email}</div>
                        <div className={styles.item}>{userS.admin ? "Admin" : "Básico"}</div>
                        <div className={`${styles.item} ${styles.actionsContainer}`}>{user.admin ? <><i className={`fa fa-trash ${styles.action}`}></i> <i className={`fa fa-pencil ${styles.action}`}></i></> : "-"}</div>
                    </div>)
            }
            ))
        }
    }, [users])

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <main className={styles.name}>
            <section className={styles.userSection}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Usuarios</h1>
                    <Button title={"Nuevo usuario"} />
                </div>
                <div className={styles.table}>
                    <div className={styles.row}>
                        <div className={`${styles.item} ${styles.header}`}>Nombre</div>
                        <div className={`${styles.item} ${styles.header}`}>Apellido</div>
                        <div className={`${styles.item} ${styles.header}`}>Email</div>
                        <div className={`${styles.item} ${styles.header}`}>Perfil</div>
                        <div className={`${styles.item} ${styles.header}`}>Acciones</div>
                    </div>
                    {userList}
                </div>
            </section>
        </main>
    )
}

export default UserPage;