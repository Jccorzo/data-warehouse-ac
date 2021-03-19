import { CREATE_CITY, CREATE_COUNTRY, CREATE_REGION, DELETE_CITY, DELETE_COUNTRY, DELETE_REGION, GET_REGIONS, UPDATE_REGION, UPDATE_CITY, UPDATE_COUNTRY } from '.';
import * as regionApi from '../api/region';

const createRegionAction = (region) => ({ type: CREATE_REGION, region })
const deleteRegionAction = (regionId) => ({ type: DELETE_REGION, regionId })
const getRegionsAction = (regions) => ({ type: GET_REGIONS, regions })
const updateRegionAction = (region) => ({ type: UPDATE_REGION, region })

const createCountryAction = (regionId, country) => ({ type: CREATE_COUNTRY, regionId, country })
const updateCountryAction = (regionId, country) => ({ type: UPDATE_COUNTRY, regionId, country })
const deleteCountryAction = (regionId, countryId) => ({ type: DELETE_COUNTRY, regionId, countryId })

const createCityAction = (regionId, countryId, city) => ({ type: CREATE_CITY, regionId, countryId, city })
const updateCityAction = (regionId, countryId, city) => ({ type: UPDATE_CITY, regionId, countryId, city })
const deleteCityAction = (regionId, countryId, cityId) => ({ type: DELETE_CITY, regionId, countryId, cityId })

export const createRegion = (region) =>
    async (dispatch) => {
        try {
            const newRegion = await regionApi.createRegion(region);
            dispatch(createRegionAction(newRegion))
        } catch (e) {
            alert(e.message)
        }
    }

export const deleteRegion = (regionId) =>
    async (dispatch) => {
        try {
            await regionApi.deleteRegion(regionId);
            dispatch(deleteRegionAction(regionId))
        } catch (e) {
            alert(e.message)
        }
    }

export const getRegions = () =>
    async (dispatch) => {
        try {
            const data = await regionApi.get();
            dispatch(getRegionsAction(data.regions))
        } catch (e) {
            alert(e.message)
        }
    }

export const updateRegion = (region) =>
    async (dispatch) => {
        try {
            await regionApi.updateRegion(region)
            dispatch(updateRegionAction(region))
        } catch (e) {
            alert(e.message)
        }
    }

export const createCountry = (regionId, country) =>
    async (dispatch) => {
        try {
            const regionUpdated = await regionApi.createCountry(regionId, country);
            dispatch(createCountryAction(regionId, regionUpdated))
        } catch (e) {
            alert(e.message)
        }
    }

export const updateCountry = (regionId, country) =>
    async (dispatch) => {
        try {
            await regionApi.updateCountry(country);
            dispatch(updateCountryAction(regionId, country))
        } catch (e) {
            alert(e.message)
        }
    }

export const deleteCountry = (regionId, countryId) =>
    async (dispatch) => {
        try {
            await regionApi.deleteCountry(countryId);
            dispatch(deleteCountryAction(regionId, countryId))
        } catch (e) {
            alert(e.message)
        }
    }

export const createCity = (regionId, countryId, city) =>
    async (dispatch) => {
        try {
            const newCity = await regionApi.createCity(countryId, city);
            dispatch(createCityAction(regionId, countryId, newCity))
        } catch (e) {
            alert(e.message)
        }
    }
export const updateCity = (regionId, countryId, city) =>
    async (dispatch) => {
        try {
            await regionApi.updateCity(city);
            dispatch(updateCityAction(regionId, countryId, city))
        } catch (e) {
            alert(e.message)
        }
    }

export const deleteCity = (regionId, countryId, cityId) =>
    async (dispatch) => {
        try {
            await regionApi.deleteCity(cityId);
            dispatch(deleteCityAction(regionId, countryId, cityId))
        } catch (e) {
            alert(e.message)
        }
    }