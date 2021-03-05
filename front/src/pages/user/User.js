import React, { useEffect, useState } from 'react';
import styles from './User.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { createUser, deleteUser, getUsers, updateUser, } from '../../actions/user';
import Button from '../../components/common/button/Button';
import Modal from '../../components/common/modal/Modal';

const UserPage = () => {
    const dispatch = useDispatch()
    const { users, user } = useSelector(state => state.auth)
    const [userList, setUserList] = useState([])
    const [newUser, setNewUser] = useState({ name: '', lastname: '', email: '', password: '', admin: false })
    const [confirmPass, setConfirmPass] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [action, setAction] = useState('Crear nuevo usuario')

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setNewUser(form => { return { ...form, [name]: value } })
    }

    const modalAction = () => setModalVisible(!modalVisible)

    const onSubmit = (event) => {
        event.preventDefault()
        if (confirmPass !== newUser.password) {
            alert("Las contraseñas no coinciden")
        } else {
            if (action === 'Crear nuevo usuario') {
                dispatch(createUser(newUser))
            } else {
                dispatch(updateUser(newUser))
            }
            modalAction()
        }
    }

    const onConfirmPassChange = evt => setConfirmPass(evt.target.value)

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
                    <Button title={"Nuevo usuario"} func={modalAction}/>
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
            {modalVisible ?
                <Modal onClick={modalAction}>
                    <form onSubmit={onSubmit} className={styles.form}>
                        <h1 className={styles.formTitle}>{action}</h1>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'name'}>Nombre:</label>
                            <input className={styles.input} onChange={handleInputChange} name={"name"} type={"text"} value={newUser.name} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'lastname'}>Apellido:</label>
                            <input className={styles.input} onChange={handleInputChange} name={"lastname"} type={"text"} value={newUser.lastname} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'email'}>Email:</label>
                            <input className={styles.input} onChange={handleInputChange} name={"email"} type={"text"} value={newUser.email} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'admin'}>Administrador:</label>
                            <input className={styles.input} onChange={handleInputChange} name={"admin"} type={"checkbox"} value={newUser.admin} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'password'}>Contraseña:</label>
                            <input className={styles.input} onChange={handleInputChange} name={"password"} type={"password"} value={newUser.password} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Repetir contraseña:</label>
                            <input className={styles.input} onChange={onConfirmPassChange} type={"password"} value={confirmPass} />
                        </div>
                        <Button title={'Guardar'} />
                    </form>
                </Modal>
                : null}
        </main>
    )
}

export default UserPage;