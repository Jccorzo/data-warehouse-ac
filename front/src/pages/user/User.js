import React, { useEffect, useState } from 'react';
import styles from './User.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { createUser, deleteUser, getUsers } from '../../actions/user';
import Button from '../../components/common/button/Button';
import Modal from '../../components/common/modal/Modal';

const UserPage = () => {
    const dispatch = useDispatch()
    const { users, user } = useSelector(state => state.auth)
    const [userList, setUserList] = useState([])
    const [newUser, setNewUser] = useState({ name: '', lastname: '', email: '', password: '', admin: false })
    const [confirmPass, setConfirmPass] = useState('')

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setNewUser(form => { return { ...form, [name]: value } })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if (confirmPass !== newUser.password) {
            alert("Las contraseñas no coinciden")
        } else {
            dispatch(createUser(newUser))
        }
    }

    useEffect(() => {
        if (users.length > 0) {
            setUserList(users.map(userS => {
                return (
                    <div key={userS._id} className={styles.row}><div className={styles.item}>{userS.name}</div>
                        <div className={styles.item}>{userS.lastname}</div>
                        <div className={styles.item}>{userS.email}</div>
                        <div className={styles.item}>{userS.admin ? "Admin" : "Básico"}</div>
                        <div className={`${styles.item} ${styles.actionsContainer}`}>{user.admin ? <><i className={`fa fa-trash ${styles.action}`} onClick={() => dispatch(deleteUser(userS._id))}></i> <i className={`fa fa-pencil ${styles.action}`}></i></> : "-"}</div>
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
            <Modal>
                <form onSubmit={onSubmit} className={styles.form}>
                    <input onChange={handleInputChange} name={"name"} type={"text"} value={newUser.name} />
                    <input onChange={handleInputChange} name={"lastname"} type={"text"} value={newUser.lastname} />
                    <input onChange={handleInputChange} name={"email"} type={"text"} value={newUser.email} />
                    <input onChange={handleInputChange} name={"password"} type={"password"} value={newUser.password} />
                    {/* <input type={"password"} value={confirmPass} /> */}
                    <input onChange={handleInputChange} name={"admin"} type={"checkbox"} value={newUser.admin} />
                </form>
            </Modal>
        </main>
    )
}

export default UserPage;