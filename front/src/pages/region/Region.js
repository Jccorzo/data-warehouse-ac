import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRegion, getRegions } from '../../actions/region';
import Button from '../../components/common/button/Button';
import styles from './Region.module.css';
import Modal from '../../components/common/modal/Modal';

const RegionPage = () => {

    const dispatch = useDispatch()
    const regions = useSelector(state => state.region.regions)
    const [modalRegion, setModalRegion] = useState(false)
    const [modalCountry, setModalCountry] = useState(false)
    const [modalCity, setModalCity] = useState(false)

    const [regionName, setRegionName] = useState('')
    const [regionAction, setRegionAction] = useState('Nueva región')

    const regionsList = useMemo(() => (
        regions.map(region => (
            <ul key={region._id}>
                <li>
                    <div>
                        <p>{region.name}</p>
                        <Button title={'Añadir país'} />
                    </div>
                    {region.countries.map(country => (
                        <div>
                            <div>
                                <p>{country.name}</p>
                                <Button title={'editar'} />
                                <Button title={'eliminar'} />
                                <Button title={'Añadir ciudad'} />
                            </div>
                            {country.cities.map(city => (
                                <div>
                                    <p>{city.name}</p>
                                    <Button title={'editar'} />
                                    <Button title={'eliminar'} />
                                </div>
                            ))}
                        </div>
                    ))}
                </li>
            </ul>
        ))
    ), [regions])

    const onRegionChange = (event) => setRegionName(event.target.value)

    useEffect(() => {
        dispatch(getRegions())
    })

    const submitRegion = (event) => {
        event.preventDefault()
        dispatch(createRegion({name: regionName}))
    }

    return (
        <main className={styles.main}>
            <div style={{alignSelf: 'flex-end'}}>
                <Button title={'Agregar región'} func={() => setModalRegion(true)} />
            </div>
            {regionsList}
            <Modal visible={modalRegion}>
                <form onSubmit={submitRegion} className={styles.form}>
                    <h1 className={styles.formTitle}>{regionAction}</h1>
                    <span onClick={() => { setModalRegion(false) }} style={{ position: 'absolute', right: 0, top: 0, margin: 30, cursor: 'pointer', fontSize: 30 }}>&times;</span>
                    <div className={styles.inputContainer}>
                        <label htmlFor={'name'}>Nombre:</label>
                        <input required={true} className={styles.input} onChange={onRegionChange} name={"name"} type={"text"} value={regionName} />
                    </div>
                    <Button title={'Guardar'} />
                </form>
            </Modal>
        </main>
    )
}

export default RegionPage;