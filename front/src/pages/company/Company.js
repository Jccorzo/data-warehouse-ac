import React, { useEffect, useState, useMemo } from 'react';
import styles from './Company.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { createCompany, deleteCompany, getCompanies, updateCompany } from '../../actions/company';
import Button from '../../components/common/button/Button';
import Modal from '../../components/common/modal/Modal';

const initCompany = () => ({ name: '', address: '', email: '', phone: '', city: '' })

const CompanyPage = () => {
    const dispatch = useDispatch()
    const regions = useSelector(state => state.region.regions)
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
            if(newCompany.city === ''){
                alert("Seleccione una ciudad")
            } else {
                dispatch(createCompany(newCompany))
            } 
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

    const cities = useMemo(() => {
        if (regions.length > 0) {
            const cities2 = regions.reduce((previous, current) => {
                const cities1 = []
                if (current.countries.length > 0) {
                    current.countries.forEach((country) => {
                        if (country.cities.length > 0) {
                            const y = country.cities
                            const x = [].concat(y)
                            const u = cities1.push(...x)
                        }
                    })
                }
                return [...previous, ...cities1]
            }, [])
            return cities2
        } else {
            return []
        }
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
                    {companiesList.length > 0 ? companiesList : <div className={styles.empty}>No hay Compañías creadas</div>}
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
                        <select className={styles.input} name='city' defaultValue={"-"} required={true} onChange={handleInputChange}>
                            <option disabled value={"-"} >Ciudad</option>
                            {cities.map((city) => <option key={city._id} value={city.name}>{city.name}</option>)}
                        </select>
                    </div>
                    <Button title={'Guardar'} />
                </form>
            </Modal>
        </main>
    )
}

export default CompanyPage;