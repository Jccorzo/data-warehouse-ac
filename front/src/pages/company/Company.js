import React, { useEffect, useState, useMemo } from 'react';
import styles from './Company.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { createCompany, deleteCompany, getCompanies, updateCompany } from '../../actions/company';
import Button from '../../components/common/button/Button';
import Modal from '../../components/common/modal/Modal';

const initCompany = () => ({ name: '', address: '', email: '', phone: '', city: '' })

const CompanyPage = () => {
    const dispatch = useDispatch()
    const companies = useSelector(state => state.company.companies)
    const [newCompany, setNewCompany] = useState(initCompany())
    const [modalVisible, setModalVisible] = useState(false)
    const [action, setAction] = useState('Crear nueva compañía')

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setNewCompany(form => ({ ...form, [name]: value }))
    }

    const modalAction = () => setModalVisible(!modalVisible)

    const onSubmit = (event) => {
        event.preventDefault()
        if (action === 'Crear nueva compañía') {
            dispatch(createCompany(newCompany))
        } else {
            dispatch(updateCompany(newCompany))
        }
        modalAction()
    }

    const changeToNewUser = () => { setAction('Crear nueva compañía'); setNewCompany(initCompany()); modalAction() }
    const changeToUpdateUser = (company) => {
        setNewCompany(company);
        setAction('Actualizar compañía');
        modalAction()
    }

    const companiesList = useMemo(() =>
        companies.map(company =>
        (
            <div key={company._id} className={styles.row}><div className={styles.item}>{company.name}</div>
                <div className={styles.item}>{company.address}</div>
                <div className={styles.item}>{company.email}</div>
                <div className={styles.item}>{company.phone}</div>
                <div className={styles.item}>{company.city}</div>
                <div className={`${styles.item} ${styles.actionsContainer}`}>
                    <i className={`fa fa-trash ${styles.action}`} onClick={() => dispatch(deleteCompany(company._id))}></i>
                    <i className={`fa fa-pencil ${styles.action}`} onClick={() => changeToUpdateUser(company)}></i>
                </div>
            </div>)
        ), [companies])

    useEffect(() => {
        dispatch(getCompanies())
    }, [])

    return (
        <main className={styles.name}>
            <section className={styles.userSection}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Compañías</h1>
                    <Button title={"Nueva compañía"} func={changeToNewUser} />
                </div>
                <div className={styles.table}>
                    <div className={styles.row}>
                        <div className={`${styles.item} ${styles.header}`}>Nombre</div>
                        <div className={`${styles.item} ${styles.header}`}>Dirección</div>
                        <div className={`${styles.item} ${styles.header}`}>Email</div>
                        <div className={`${styles.item} ${styles.header}`}>Teléfono</div>
                        <div className={`${styles.item} ${styles.header}`}>Ciudad</div>
                        <div className={`${styles.item} ${styles.header}`}>Acciones</div>
                    </div>
                    {companiesList}
                </div>
            </section>
            <Modal visible={modalVisible}>
                <form onSubmit={onSubmit} className={styles.form}>
                    <h1 className={styles.formTitle}>{action}</h1>
                    <span onClick={() => { modalAction() }} style={{ position: 'absolute', right: 0, top: 0, margin: 30, cursor: 'pointer', fontSize: 30 }}>&times;</span>
                    <div className={styles.inputContainer}>
                        <label htmlFor={'name'}>Nombre:</label>
                        <input required={true} className={styles.input} onChange={handleInputChange} name={"name"} type={"text"} value={newCompany.name} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor={'address'}>Dirección:</label>
                        <input required={true} className={styles.input} onChange={handleInputChange} name={"address"} type={"text"} value={newCompany.address} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor={'email'}>Email:</label>
                        <input required={true} className={styles.input} onChange={handleInputChange} name={"email"} type={"email"} value={newCompany.email} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor={'phone'}>Teléfono:</label>
                        <input className={styles.input} onChange={handleInputChange} name={"phone"} type={"number"} value={newCompany.phone} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor={'city'}>Ciudad:</label>
                        <input required={true} className={styles.input} onChange={handleInputChange} name={"city"} type={"text"} value={newCompany.city} />
                    </div>
                    <Button title={'Guardar'} />
                </form>
            </Modal>
        </main>
    )
}

export default CompanyPage;