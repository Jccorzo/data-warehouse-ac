import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCity, createCountry, createRegion, deleteCity, deleteCountry, getRegions } from '../../actions/region';
import Button from '../../components/common/button/Button';
import styles from './Region.module.css';
import Modal from '../../components/common/modal/Modal';

const RegionPage = () => {

    const dispatch = useDispatch()
    const regions = useSelector(state => state.region.regions)
    const [modalRegion, setModalRegion] = useState(false)

    const [name, setName] = useState('')
    const [regionAction, setRegionAction] = useState('Nueva región')
    const [regionToEdit, setRegionToEdit] = useState(null)

    const changeToNewCountry = (regionId) => {
        setModalRegion(true)
        setRegionAction('Nuevo país')
        setRegionToEdit({ _id: regionId })
    }

    const changeToNewCity = (regionId, countryId) => {
        setModalRegion(true)
        setRegionAction('Nueva ciudad')
        setRegionToEdit({ _id: regionId, country: { _id: countryId } })
    }

    const submitRegion = (event) => {
        event.preventDefault()
        if (regionAction === 'Nueva región') {
            dispatch(createRegion({ name: name }))
        } else if (regionAction === 'Nuevo país') {
            dispatch(createCountry({ ...regionToEdit, country: { name: name } }))
        } else if (regionAction === 'Nueva ciudad') {
            dispatch(createCity({ ...regionToEdit, country: { ...regionToEdit.country, city: { name: name, code: name.toLowerCase().slice(0, 3) } } }))
        }
        setName('')
        setModalRegion(false)
    }

    const onNameChange = (event) => setName(event.target.value)

    const regionsList = useMemo(() => (
        regions.map(region => (
            <ul key={region._id}>
                <li>
                    <div className={styles.nameWithButton}>
                        <p>{region.name}</p>
                        <Button title={'Añadir país'} func={() => changeToNewCountry(region._id)} />
                    </div>
                    {region.countries.map(country => (
                        <div>
                            <div className={styles.countryButtonsContainer}>
                                <div className={styles.countryButtons}>
                                    <p>{country.name}</p>
                                    <Button style={{ width: 'max-content', backgroundColor: 'white', margin: '0px 5px 0px 20px', color: '#0683F9' }} title={'Editar'} />
                                    <Button style={{ width: 'max-content', backgroundColor: 'red', margin: '0px 10px', color: 'white' }} title={'Eliminar'} func={() => dispatch(deleteCountry(region._id, country._id))} />
                                </div>
                                <Button title={'Añadir ciudad'} func={() => changeToNewCity(region._id, country._id)} />
                            </div>
                            {country.cities.map(city => (
                                <div className={styles.countryButtons}>
                                    <p>{city.name}</p>
                                    <Button style={{ width: 'max-content', backgroundColor: 'white', margin: '0px 5px 0px 20px', color: '#0683F9' }} title={'Editar'} />
                                    <Button style={{ width: 'max-content', backgroundColor: 'red', margin: '0px 10px', color: 'white' }} title={'Eliminar'} func={() => dispatch(deleteCity(region._id, country._id, city._id))} />
                                </div>
                            ))}
                        </div>
                    ))}
                </li>
            </ul>
        ))
    ), [regions])

    useEffect(() => {
        dispatch(getRegions())
    })

    return (
        <main className={styles.main}>
            <div style={{ alignSelf: 'flex-end' }}>
                <Button title={'Agregar región'} func={() => setModalRegion(true)} />
            </div>
            {regionsList}
            <Modal visible={modalRegion}>
                <form onSubmit={submitRegion} className={styles.form}>
                    <h1 className={styles.formTitle}>{regionAction}</h1>
                    <span onClick={() => { setModalRegion(false) }} style={{ position: 'absolute', right: 0, top: 0, margin: 30, cursor: 'pointer', fontSize: 30 }}>&times;</span>
                    <div className={styles.inputContainer}>
                        <label htmlFor={'name'}>Nombre:</label>
                        <input required={true} className={styles.input} onChange={onNameChange} name={"name"} type={"text"} value={name} />
                    </div>
                    <Button title={'Guardar'} />
                </form>
            </Modal>
        </main>
    )
}

export default RegionPage;