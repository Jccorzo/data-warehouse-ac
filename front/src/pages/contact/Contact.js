import React, { useState } from 'react';
import styles from './Contact.module.css';
import Button from '../../components/common/button/Button';
import Modal from '../../components/common/modal/Modal'; 

const ContactPage = () => {
    
    const [search, setSearch] = useState('');
    

    return (
        <main className={styles.main}>
            <h1>Contactos</h1>
            <div className={styles.topContainer}>
                <div className={styles.searchContainer}>
                    <input className={styles.search} type={'text'} value={search} onChange={(evt) => setSearch(evt.target.value)}/>
                    <img className={styles.img} src={'../images/search.jpeg'}/>
                </div>
                <div className={styles.buttonsContainer}>
                    <img className={styles.img} src={'../images/upload.jpeg'} style={{ border: '1px solid #1d72c2'}}/>
                    <button className={styles.exportContact}>Exportar contactos</button>
                    <button className={styles.addContact}>Agregar contacto</button>
                </div>
            </div>
            <div className={styles.table}>

            </div>
        </main>
    )
}

export default ContactPage;