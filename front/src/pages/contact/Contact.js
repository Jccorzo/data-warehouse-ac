import React, { useEffect, useMemo, useState } from 'react';
import styles from './Contact.module.css';
import Modal from '../../components/common/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createContact, deleteContacts, getContacts, updateContact, getContactsByWord, getContactsAction } from '../../actions/contact';

const resetContact = () => ({
    name: '',
    lastname: '',
    position: '',
    email: '',
    company: '',
    region: '',
    country: '',
    city: '',
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

    const [selectedContacts, setSelectedContacts] = useState([]);

    const [contactModal, setContactModal] = useState(true);
    const [contactAction, setContactAction] = useState('Nuevo contacto')

    const [contact, setContact] = useState(resetContact())

    const [selectedRegion, setSelectedRegion] = useState({ _id: '', countries: [] });
    const [selectedCountry, setSelectedCountry] = useState({ _id: '', cities: [] });
    const [selectedCity, setSelectedCity] = useState({ _id: '' });

    const [channels] = useState(["Teléfono", "Email", "WhatsApp", "Facebook", "Twitter"])

    const contacts = useSelector(state => state.contact.contacts)
    const contactList = useMemo(() => (
        contacts.map(contact => (
            <div className={styles.row}>
                <div className={styles.item}><input className={styles.check} type={'checkbox'} /></div>
                <div className={styles.item}><p>{contact.name}</p><p>{contact.email}</p></div>
                <div className={styles.item}><p>{contact.country}</p><p>{contact.region}</p></div>
                <div className={styles.item}>{contact.company}</div>
                <div className={styles.item}>{contact.position}</div>
                <div className={styles.item}>{contact.channels.filter(channel => channel.preference === true).map(channel =>(<div>{channel.name}</div>))}</div>
                <div className={styles.item}>{contact.interest}%</div>
                <div className={styles.item}></div>
            </div>
        ))
    ), [contacts])

    console.log(contacts)

    const regions = useSelector(state => state.region.regions)
    const companies = useSelector(state => state.company.companies)

    useEffect(() => {
        dispatch(getContacts())
    }, [])

    const getContactsBy = () => dispatch(getContactsByWord(search))

    const sort = (attribute, array = [], asc = true) => {
        if (array.length > 0) {
            return array.sort((a, b) => asc ? a[attribute] - b[attribute] : b[attribute] - a[attribute])
        } else {
            return array
        }
    }

    const sortBy = (attribute, array, asc) => {
        dispatch(getContactsAction(sort(attribute, array, asc)))
    }

    const addContactToSelected = (contact) => {
        setSelectedContacts([contact, ...selectedContacts])
    }

    const removeSelectedContact = (contact) => {
        setSelectedContacts(selectedContacts.filter(currentContact => currentContact !== contact))
    }

    const removeContacts = (contacts = []) => {
        dispatch(deleteContacts(contacts))
        contacts.forEach(currentContact => {
            removeSelectedContact(currentContact)
        })
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setContact(contact => ({ ...contact, [name]: value }))
    }

    const handleInputChangeForChannels = (event, pos, att) => {
        const value = event.target.value;
        setContact(contact => ({ ...contact, channels: contact.channels.map((channel, index) => (index === pos ? ({ ...channel, [att]: value }) : channel)) }))
    }

    const selectRegion = (event) => {
        handleInputChange(event)
        setSelectedRegion(findById(event.target.value, regions))
    }

    const selectCountry = (event) => {
        handleInputChange(event)
        setSelectedCountry(findById(event.target.value, selectedRegion.countries))
    }

    const selectCity = (event) => {
        handleInputChange(event)
        setSelectedCity(findById(event.target.value, selectedCountry.cities))
    }

    const findById = (id, array) => array.filter(item => item._id == id)[0]

    const modalAction = () => setContactModal(!contactModal)

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(contact)
        if (!contact.company) {
            alert('company vacío')
        } else {
            dispatch(createContact(contact))
        }
        //setContact(resetContact())
        //setSelectedCity({_id:''})
        //setSelectedCountry({_id: '', cities: []})
        //setSelectedRegion({_id: '', countries: []})

    }

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
                    <button onClick={modalAction} className={styles.addContact}>Agregar contacto</button>
                </div>
            </div>
            <div className={styles.table}>
                <div className={styles.row} style={{ height: 66.5, borderBottom: '1px solid #e8e8e8' }}>
                    <div className={`${styles.item} ${styles.header}`}> <input className={styles.check} type={'checkbox'} /> </div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBy('contact', contacts, nameAsc); setNameAsc(!nameAsc) }}>Contacto <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBy('region', contacts, regionAsc); setRegionAsc(!regionAsc) }}>País/Región <img className={styles.sort} src={'../images/sort.jpeg'} /> </div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBy('company', contacts, companyAsc); setCompanyAsc(!companyAsc) }}>Compañía <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`} onClick={() => { sortBy('charge', contacts, chargeAsc); setChargeAsc(!chargeAsc) }}>Cargo <img className={styles.sort} src={'../images/sort.jpeg'} /></div>
                    <div className={`${styles.item} ${styles.header}`}>Canal preferido</div>
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
                                <select className={styles.input} name='company' defaultValue={"-"} required={true} onChange={handleInputChange}>
                                    <option disabled value={"-"} >Compañía</option>
                                    {companies.map((company) => <option key={company._id} value={company._id}>{company.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.secondaryData}>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'region'}>Region:</label>
                            <select className={styles.input} name='region' defaultValue={"-"} required={true} onChange={selectRegion}>
                                <option disabled value={"-"} >Region</option>
                                {regions.map((region) => <option key={region._id} value={region._id}>{region.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'country'}>País:</label>
                            <select className={styles.input} name='country' disabled={selectedRegion._id ? false : true} defaultValue={"-"} required={true} onChange={selectCountry}>
                                <option disabled value={"-"} >País</option>
                                {selectedRegion.countries.map((region) => <option key={region._id} value={region._id}>{region.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'city'}>Ciudad:</label>
                            <select className={styles.input} name='city' defaultValue={"-"} disabled={selectedCountry._id ? false : true} required={true} onChange={selectCity}>
                                <option disabled value={"-"} >Ciudad</option>
                                {selectedCountry.cities.map((region) => <option key={region._id} value={region._id}>{region.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'address'}>Dirección:</label>
                            <input required={true} className={styles.input} onChange={handleInputChange} name={"address"} type={"text"} value={contact.address} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor={'interest'} style={{ width: 'max-content' }} >Interés:</label>
                            <select className={styles.input} style={{ width: 'max-content' }} name={'interest'} defaultValue={0} required={true} onChange={handleInputChange}>
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
                                <label style={{ width: 'max-content' }}>Cuenta de usuario:</label>
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
                        <button onClick={modalAction}>Cancelar</button>
                        <input type={'submit'} value={'Guardar'} disabled={false} />
                    </div>

                </form>
            </Modal>
        </main>
    )
}

export default ContactPage;