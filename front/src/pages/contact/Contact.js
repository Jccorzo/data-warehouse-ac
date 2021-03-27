import React, { useEffect, useMemo, useState } from 'react';
import styles from './Contact.module.css';
import Modal from '../../components/common/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createContact, deleteContactById, getContacts, updateContact, getContactsByWord, getContactsAction, selectContact, deleteSelectedContacts, selectAllContacts } from '../../actions/contact';

const resetContact = () => ({
    name: '',
    lastname: '',
    position: '',
    email: '',
    company: {
        _id: "",
        name: ""
    },
    region: {
        _id: "",
        name: ""
    },
    country: {
        _id: "",
        name: ""
    },
    city: {
        _id: "",
        name: ""
    },
    address: '',
    interest: 0,
    channels: [
        {
            name: "Teléfono",
            account: '',
            preference: false
        },
        {
            name: "Email",
            account: '',
            preference: false
        },
        {
            name: "WhatsApp",
            account: '',
            preference: false
        },
        {
            name: "Facebook",
            account: '',
            preference: false
        },
        {
            name: "Twitter",
            account: '',
            preference: false
        }
    ]
})

const ContactPage = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');

    const [nameAsc, setNameAsc] = useState(true);
    const [regionAsc, setRegionAsc] = useState(true);
    const [companyAsc, setCompanyAsc] = useState(true);
    const [chargeAsc, setChargeAsc] = useState(true);
    const [interestAsc, setInterestAsc] = useState(true);

    const [contactModal, setContactModal] = useState(false);
    const [contactAction, setContactAction] = useState('Nuevo contacto');
    const [deleteModal, setDeleteModal] = useState(false);

    const [contact, setContact] = useState(resetContact())
    const [contactReadyToSave, setContactReadyToSave] = useState(false)

    const [selectedRegion, setSelectedRegion] = useState({ _id: '', countries: [] });
    const [selectedCountry, setSelectedCountry] = useState({ _id: '', cities: [] });
    const [_, setSelectedCity] = useState({ _id: '' });

    const [channels] = useState(["Teléfono", "Email", "WhatsApp", "Facebook", "Twitter"])

    const getColor = (interest) => {
        if (interest == 25) {
            return '#1CC1F5'
        } else if (interest == 50) {
            return '#FFC700'
        } else if (interest == 75) {
            return '#FF6F00'
        } else if (interest == 100) {
            return '#DE0028'
        }
    }

    const contacts = useSelector(state => state.contact.contacts)
    const selectedContacts = contacts.filter(contact => contact.selected === true)

    const regions = useSelector(state => state.region.regions)
    const companies = useSelector(state => state.company.companies)

    useEffect(() => {
        dispatch(getContacts())
    }, [])

    useEffect(() => {
        const obj = {
            name: contact.name,
            lastname: contact.lastname,
            position: contact.position,
            email: contact.email,
            company: contact.company._id,
            region: contact.region._id,
            country: contact.country._id,
            city: contact.city._id,
            address: contact.address
        }
        const length = Object.keys(obj).map(key => contact[key]).filter(value => value).length

        if(length == 9){
            setContactReadyToSave(true)
        } else {
            setContactReadyToSave(false)
        }
    }, [contact])

    const getContactsBy = () => dispatch(getContactsByWord(search))

    const sortAtt = (attribute, array = [], asc = true) => {
        if (array.length > 0) {
            return array.sort((a, b) => asc ? (a[attribute] > b[attribute] ? 1 : -1) : (a[attribute] < b[attribute] ? 1 : -1))
        } else {
            return array
        }
    }

    const sortAtts = (att1, att2, array = [], asc = true) => {
        if (array.length > 0) {
            return array.sort((a, b) => asc ? (a[att1][att2] > b[att1][att2] ? 1 : -1) : (a[att1][att2] < b[att1][att2] ? 1 : -1))
        } else {
            return array
        }
    }

    const sortBySubAttibutes = (att1, att2, array, asc) => {
        dispatch(getContactsAction(sortAtts(att1, att2, array, asc)))
    }

    const sortBy = (attribute, array, asc) => {
        dispatch(getContactsAction(sortAtt(attribute, array, asc)))
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setContact(contact => ({ ...contact, [name]: value }))
    }

    const handleSelectChange = (event, array) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const item = findById(value, array)
        setContact(contact => ({ ...contact, [name]: { _id: item._id, name: item.name } }))
    }

    const handleInputChangeForChannels = (event, pos, att) => {
        const value = event.target.value;
        setContact(contact => ({ ...contact, channels: contact.channels.map((channel, index) => (index === pos ? ({ ...channel, [att]: value }) : channel)) }))
    }

    const selectCompany = (event) => {
        handleSelectChange(event, companies)
    }

    const selectRegion = (event) => {
        handleSelectChange(event, regions)
        console.log(regions)
        setSelectedRegion(findById(event.target.value, regions))
    }

    const selectCountry = (event) => {
        console.log(event.target.value, findById(event.target.value, selectedRegion.countries))
        handleSelectChange(event, selectedRegion.countries)
        setSelectedCountry(findById(event.target.value, selectedRegion.countries))
    }

    const selectCity = (event) => {
        handleSelectChange(event, selectedCountry.cities)
        setSelectedCity(findById(event.target.value, selectedCountry.cities))
    }

    const findById = (id, array) => array.filter(item => item._id == id)[0]

    const modalAction = () => setContactModal(!contactModal)

    const onSubmit = (event) => {
        event.preventDefault();
        if (contactAction === 'Nuevo contacto') {
            dispatch(createContact(contact))
        } else {
            dispatch(updateContact(contact))
        }
        setContact(resetContact())
        setSelectedCity({ _id: '' })
        setSelectedCountry({ _id: '', cities: [] })
        setSelectedRegion({ _id: '', countries: [] })
        setContactModal(false)
    }

    const openToUpdateContact = (contact) => {
        const region = regions.find(region => region._id == contact.region._id)
        const country = findById(contact.country._id, region.countries)
        const city = findById(contact.city._id, country.cities)
        setSelectedRegion(region)
        setSelectedCountry(country)
        setSelectedCity(city)
        setContact(contact)
        setContactAction('Editar contacto')
        modalAction()
    }

    const addNewContact = () => {
        setContactAction('Nuevo contacto')
        setSelectedCity({ _id: '' })
        setSelectedCountry({ _id: '', cities: [] })
        setSelectedRegion({ _id: '', countries: [] })
        setContact(resetContact())
        modalAction()
    }

    const deleteContacts = () => {
        dispatch(dispatch(deleteSelectedContacts(selectedContacts.map(contact => contact._id))))
        setDeleteModal(false)
    }

    const contactList =
        contacts.map(contact => (
            <div key={contact._id} className={styles.row}>
                <div className={styles.item}><input className={styles.check} type={'checkbox'} checked={contact.selected} onChange={(evt) => dispatch(selectContact(contact._id, evt.target.checked))} /></div>
                <div className={styles.item}><p className={styles.text}>{contact.name}</p><p className={styles.subtext}>{contact.email}</p></div>
                <div className={styles.item}><p className={styles.text}>{contact.country?.name}</p><p className={styles.subtext}>{contact.region?.name}</p></div>
                <div className={styles.item}><p className={styles.text}>{contact.company?.name}</p></div>
                <div className={styles.item}><p className={styles.text}>{contact.position}</p></div>
                <div className={styles.item} style={{ flexDirection: 'row', alignItems: 'center' }}><p className={styles.text} style={{ width: 24 }}>{contact.interest}%</p> <div className={styles.interestBarContainer}> <div className={styles.interestBarDown} /> <div className={styles.interestBarUp} style={{ backgroundColor: getColor(contact.interest), width: `${contact.interest}%` }} /> </div></div>
                <div className={`${styles.item} ${styles.actionsColumn}`} style={{ alignItems: 'center' }}> <div className={styles.threeDots}></div>  <div className={styles.actionsContainer}><i onClick={() => openToUpdateContact(contact)} className={'fa fa-pencil'}></i>  <i className={'fa fa-trash'} onClick={() => dispatch(deleteContactById(contact._id))} ></i></div></div>
            </div>
        ))

    return (
        <main className={styles.main}>
            <h1>Contactos</h1>
            <div className={styles.topContainer}>
                <div className={styles.searchContainer}>
                    <input className={styles.search} type={'text'} value={search} onChange={(evt) => setSearch(evt.target.value)} />
                    <img className={styles.img} src={'../images/search.jpeg'} onClick={getContactsBy} />
                </div>
                <div className={styles.buttonsContainer}>
                    <img className={styles.img} src={'../images/upload.jpeg'} style={{ border: '1px solid #1d72c2', visibility: 'hidden' }} />
                    <button style={{ visibility: 'hidden' }} className={styles.exportContact}>Exportar contactos</button>
                    <button onClick={addNewContact} className={styles.addContact}>Agregar contacto</button>
                </div>
            </div>
            {selectedContacts.length > 0 ? <div className={styles.selectedContactsContainer}><p className={styles.selectedContacts}>{`${selectedContacts.length} seleccionados`}</p> <button onClick={() => setDeleteModal(true)} className={styles.deleteContacts}> <i className={`fa fa-trash ${styles.iconD}`}></i> Eliminar contactos</button>  </div> : null}
            <div className={styles.table}>
                <div className={`${styles.row} ${styles.firstRow}`} style={{ height: 66.5, borderBottom: '1px solid #e8e8e8' }}>
                    <div className={`${styles.item} ${styles.header}`} style={{ flexDirection: 'column' }}> <input onChange={(evt) => dispatch(selectAllContacts(contacts.map(contact => contact._id), evt.target.checked))} checked={selectedContacts.length === contacts.length ? true : false} className={styles.check} type={'checkbox'} /> </div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBy('name', contacts, nameAsc); setNameAsc(!nameAsc) }}>Contacto <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBySubAttibutes('country', 'name', contacts, regionAsc); setRegionAsc(!regionAsc) }}>País/Región <img className={styles.sort} src={'../images/sort.jpeg'} /> </div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBySubAttibutes('company', 'name', contacts, companyAsc); setCompanyAsc(!companyAsc) }}>Compañía <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBy('position', contacts, chargeAsc); setChargeAsc(!chargeAsc) }}>Cargo <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBy('interest', contacts, interestAsc); setInterestAsc(!interestAsc) }}>Interés <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`}>Acciones</div>
                </div>
                {contactList.length > 0 ? contactList : <div className={styles.empty}>No hay contactos creados</div>}
            </div>
            <Modal visible={contactModal}>
                <form onSubmit={onSubmit} className={styles.form}>

                    <div className={styles.top}>
                        <div className={styles.titleContainer}>
                            <p className={styles.formTitle}>{contactAction}</p>
                            <span onClick={modalAction} style={{ cursor: 'pointer', fontSize: 30 }}>&times;</span>
                        </div>
                        <div className={styles.mainData}>
                            <div className={styles.inputContainer}>
                                <label className={styles.important} htmlFor={'name'}>Nombre:</label>
                                <input required={true} className={styles.input} onChange={handleInputChange} name={"name"} type={"text"} value={contact.name} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.important} htmlFor={'lastname'}>Apellido:</label>
                                <input required={true} className={styles.input} onChange={handleInputChange} name={"lastname"} type={"text"} value={contact.lastname} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.important} htmlFor={'position'}>Cargo:</label>
                                <input required={true} className={styles.input} onChange={handleInputChange} name={"position"} type={"text"} value={contact.position} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.important} htmlFor={'email'}>Email:</label>
                                <input required={true} className={styles.input} onChange={handleInputChange} name={"email"} type={"text"} value={contact.email} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.important} htmlFor={'company'}>Compañia:</label>
                                <select className={styles.input} name='company' defaultValue={""} required={true} onChange={selectCompany} value={contact.company._id}>
                                    <option disabled value={""} >Compañía</option>
                                    {companies.map((company) => <option key={company._id} value={company._id}>{company.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.secondaryData}>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'region'}>Region:</label>
                            <select className={styles.input} name='region' defaultValue={""} required={true} onChange={selectRegion} value={contact.region._id}>
                                <option disabled value={""} >Region</option>
                                {regions.map((region) => <option key={region._id} value={region._id}>{region.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'country'}>País:</label>
                            <select className={styles.input} name='country' defaultValue={""} disabled={selectedRegion._id ? false : true} required={true} onChange={selectCountry} value={contact.country._id}>
                                <option disabled value={""} >País</option>
                                {selectedRegion.countries.map((country) => <option key={country._id} value={country._id}>{country.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'city'}>Ciudad:</label>
                            <select className={styles.input} name='city' defaultValue={""} disabled={selectedCountry._id ? false : true} required={true} onChange={selectCity} value={contact.city._id}>
                                <option disabled value={""} >Ciudad</option>
                                {selectedCountry.cities.map((city) => <option key={city._id} value={city._id}>{city.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'address'}>Dirección:</label>
                            <input required={true} className={styles.input} onChange={handleInputChange} name={"address"} type={"text"} value={contact.address} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'interest'} style={{ width: 'max-content' }} >Interés:</label>
                            <select className={styles.input} style={{ width: 'max-content' }} name={'interest'} defaultValue={0} required={true} onChange={handleInputChange} value={contact.interest}>
                                <option value={0} >0%</option>
                                <option value={25} >25%</option>
                                <option value={50} >50%</option>
                                <option value={75} >75%</option>
                                <option value={100} >100%</option>
                            </select>
                        </div>
                    </div>

                    {channels.map((channel, index) => (
                        <div key={index} className={styles.thirdData}>
                            <div className={styles.inputContainer}>
                                <label style={{ width: 'max-content' }}>Canal:</label>
                                <input className={styles.input} disabled={true} onChange={(evt) => handleInputChangeForChannels(evt, index, 'name')} type={"text"} value={channel} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label style={{ width: 'max-content' }}>Cuenta de usuario:</label>
                                <input className={styles.input} onChange={(evt) => handleInputChangeForChannels(evt, index, 'account')} placeholder={'@ejemplo'} type={"text"} value={contact.channels[index].account} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label >Preferencias:</label>
                                <select className={styles.input} defaultValue={"-"} onChange={(evt) => handleInputChangeForChannels(evt, index, 'preference')}>
                                    <option disabled value={"-"} >Sin preferencia</option>
                                    <option value={true} >Canal favorito</option>
                                    <option value={false} >No molestar</option>
                                </select>
                            </div>
                        </div>)
                    )}

                    <div className={styles.formButtons}>
                        <button className={styles.cancelButton} onClick={modalAction}>Cancelar</button>
                        <input className={styles.confirmButton} type={'submit'} value={'Guardar'} disabled={!contactReadyToSave} />
                    </div>

                </form>
            </Modal>
            <Modal visible={deleteModal}>
                <div className={styles.deleteContactsModal}>
                    <img className={styles.deleteImage} alt={'delete icon'} src={'../images/delete-icon.jpeg'} />
                    <p className={styles.deleteText}>¿Seguro que deseas eliminar los contactos seleccionados?</p>
                    <div className={styles.deleteButtonsContainer}>
                        <button className={styles.cancelDelete} onClick={() => setDeleteModal(false)}>Cancelar</button>
                        <button className={styles.confirmDelete} onClick={deleteContacts}>Eliminar</button>
                    </div>
                </div>
            </Modal>
        </main>
    )
}

export default ContactPage;