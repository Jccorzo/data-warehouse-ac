import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCity, createCountry, createRegion, deleteCity, deleteCountry, deleteRegion, getRegions, updateCity, updateCountry, updateRegion } from '../../actions/region';
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

    const changeToNewRegion = () => {
        setModalRegion(true)
        setRegionAction('Nueva región')
    }

    const changeToUpdateRegion = (region) => {
        setModalRegion(true)
        setRegionAction('Editar región')
        setRegionToEdit(region)
    }

    const changeToNewCountry = (regionId) => {
        setModalRegion(true)
        setRegionAction('Nuevo país')
        setRegionToEdit({ _id: regionId })
    }

    const changeToUpdateCountry = (regionId, countryId) => {
        setModalRegion(true)
        setRegionAction('Editar país')
        setRegionToEdit({ _id: regionId, country: { _id: countryId } })
    }

    const changeToNewCity = (regionId, countryId) => {
        setModalRegion(true)
        setRegionAction('Nueva ciudad')
        setRegionToEdit({ _id: regionId, country: { _id: countryId } })
    }

    const changeToUpdateCity = (regionId, countryId, cityId) => {
        setModalRegion(true)
        setRegionAction('Editar ciudad')
        setRegionToEdit({ _id: regionId, country: { _id: countryId, city: { _id: cityId } } })
    }

    const submitRegion = (event) => {
        event.preventDefault()
        if (regionAction === 'Nueva región') {
            dispatch(createRegion({ name: name }))
        } else if (regionAction === 'Nuevo país') {
            dispatch(createCountry({ ...regionToEdit, country: { name: name } }))
        } else if (regionAction === 'Nueva ciudad') {
            dispatch(createCity({ ...regionToEdit, country: { ...regionToEdit.country, city: { name: name, code: name.toLowerCase().slice(0, 3) } } }))
        } else if (regionAction === 'Editar región') {
            dispatch(updateRegion({ ...regionToEdit, name: name }))
        } else if (regionAction === 'Editar país') {
            dispatch(updateCountry({ _id: regionToEdit._id, country: { _id: regionToEdit.country._id, name: name } }))
        } else if (regionAction === 'Editar ciudad') {
            dispatch(updateCity({ _id: regionToEdit._id, country: { _id: regionToEdit.country._id, city: { _id: regionToEdit.country.city._id, name: name, code: name.toLowerCase().slice(0, 3) } } }))
        }
        setName('')
        setModalRegion(false)
    }

    const onNameChange = (event) => setName(event.target.value)

    const regionsList = useMemo(() => (
        regions.map(region => (
            <li key={region._id} style={{ margin: '20px 0' }}>
                <div className={styles.nameWithButton} style={{ margin: '10px 0' }}>
                    <div className={styles.countryButtons}>
                        <p className={styles.regionP}>{region.name}</p>
                        <Button style={{ width: 'max-content', backgroundColor: 'white', margin: '0px 5px 0px 20px', color: '#0683F9' }} title={'Editar'} func={() => changeToUpdateRegion(region)} />
                        <Button style={{ width: 'max-content', backgroundColor: 'red', margin: '0px 10px', color: 'white' }} title={'Eliminar'} func={() => dispatch(deleteRegion(region._id))} />
                    </div>
                    <Button title={'Añadir país'} style={{ opacity: 0.8 }} func={() => changeToNewCountry(region._id)} />
                </div>
                {region.countries.map(country => (
                    <div style={{ marginLeft: 40 }} key={country._id}>
                        <div className={styles.countryButtonsContainer} style={{ margin: '10px 0 ' }}>
                            <div className={styles.countryButtons}>
                                <p className={styles.countryP}>{country.name}</p>
                                <Button style={{ width: 'max-content', backgroundColor: 'white', margin: '0px 5px 0px 20px', color: '#0683F9' }} title={'Editar'} func={() => changeToUpdateCountry(region._id, country._id)} />
                                <Button style={{ width: 'max-content', backgroundColor: 'red', margin: '0px 10px', color: 'white' }} title={'Eliminar'} func={() => dispatch(deleteCountry(region._id, country._id))} />
                            </div>
                            <Button title={'Añadir ciudad'} style={{ opacity: 0.5 }} func={() => changeToNewCity(region._id, country._id)} />
                        </div>
                        {country.cities.map(city => (
                            <div style={{ margin: '10px 40px' }} key={city._id} className={styles.countryButtons}>
                                <p className={styles.cityP}>{city.name}</p>
                                <Button style={{ width: 'max-content', backgroundColor: 'white', margin: '0px 5px 0px 20px', color: '#0683F9' }} title={'Editar'} func={() => changeToUpdateCity(region._id, country._id, city._id)} />
                                <Button style={{ width: 'max-content', backgroundColor: 'red', margin: '0px 10px', color: 'white' }} title={'Eliminar'} func={() => dispatch(deleteCity(region._id, country._id, city._id))} />
                            </div>
                        ))}
                    </div>
                ))}
            </li>
        ))
    ), [regions])

    useEffect(() => {
        dispatch(getRegions())
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Regiones</h1>
                <Button title={'Agregar región'} func={changeToNewRegion} />
            </div>
            <ul>
                {regionsList.length > 0 ? regionsList : <div className={styles.empty}>No hay Regiones creadas</div>}
            </ul>
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