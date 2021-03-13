import React, { useEffect, useMemo, useState } from 'react';
import styles from './Contact.module.css';
import Modal from '../../components/common/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createContact, deleteContact, getContacts, updateContact } from '../../actions/contact';
const ContactPage = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');
    const contacts = useSelector(state => state.contact.contacts)
    const contactList = useMemo(() => [], [contacts])

    useEffect(() => {
        dispatch(getContacts())
    }, [])

    return (
        <main className={styles.main}>
            <h1>Contactos</h1>
            <div className={styles.topContainer}>
                <div className={styles.searchContainer}>
                    <input className={styles.search} type={'text'} value={search} onChange={(evt) => setSearch(evt.target.value)} />
                    <img className={styles.img} src={'../images/search.jpeg'} />
                </div>
                <div className={styles.buttonsContainer}>
                    <img className={styles.img} src={'../images/upload.jpeg'} style={{ border: '1px solid #1d72c2' }} />
                    <button className={styles.exportContact}>Exportar contactos</button>
                    <button className={styles.addContact}>Agregar contacto</button>
                </div>
            </div>
            <div className={styles.table}>
                <div className={styles.row} style={{ height: 66.5, borderBottom: '1px solid #e8e8e8' }}>
                    <div className={`${styles.item} ${styles.header}`}> <input className={styles.check} type={'checkbox'} /> </div>
                    <div className={`${styles.item} ${styles.header}`}>Contacto <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`}>País/Región <img className={styles.sort} src={'../images/sort.jpeg'} /> </div>
                    <div className={`${styles.item} ${styles.header}`}>Compañía <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`}>Cargo <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`}>Canal preferido</div>
                    <div className={`${styles.item} ${styles.header}`}>Interés <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`}>Acciones</div>
                </div>
                {contactList.length > 0 ? contactList : <div className={styles.empty}>No hay contactos creados</div>}
            </div>
        </main>
    )
}

export default ContactPage;