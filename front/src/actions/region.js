import { CREATE_CITY, CREATE_COUNTRY, CREATE_REGION, DELETE_CITY, DELETE_COUNTRY, DELETE_REGION, GET_REGIONS, UPDATE_CITY, UPDATE_COUNTRY } from '.';
import * as regionApi from '../api/region';

const createRegionAction = (region) => ({ type: CREATE_REGION, region })
const deleteRegionAction = (regionId) => ({ type: DELETE_REGION, regionId })
const getRegionsAction = (regions) => ({ type: GET_REGIONS, regions })

const createCountryAction = (region) => ({ type: CREATE_COUNTRY, region })
const updateCountryAction = (region) => ({ type: UPDATE_COUNTRY, region })
const deleteCountryAction = (regionId, countryId) => ({ type: DELETE_COUNTRY, regionId, countryId })

const createCityAction = (region) => ({ type: CREATE_CITY, region })
const updateCityAction = (region) => ({ type: UPDATE_CITY, region })
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
            const regions = await regionApi.get();
            dispatch(getRegionsAction(regions))
        } catch (e) {
            alert(e.message)
        }
    }

export const createCountry = (region) =>
    async (dispatch) => {
        try {
            const newCountry = await regionApi.createCountry(region);
            dispatch(createCountryAction(newCountry))
        } catch (e) {
            alert(e.message)
        }
    }

export const updateCountry = (region) =>
    async (dispatch) => {
        try {
            await regionApi.updateCountry(region);
            dispatch(updateCountryAction(region))
        } catch (e) {
            alert(e.message)
        }
    }

export const deleteCountry = (regionId, countryId) =>
    async (dispatch) => {
        try {
            await regionApi.deleteCountry(regionId, countryId);
            dispatch(deleteCountryAction(regionId, countryId))
        } catch (e) {
            alert(e.message)
        }
    }

export const createCity = (region) =>
    async (dispatch) => {
        try {
            const newCity = await regionApi.createCity(region);
            dispatch(createCityAction(newCity))
        } catch (e) {
            alert(e.message)
        }
    }
export const updateCity = (region) =>
    async (dispatch) => {
        try {
            await regionApi.updateCity(region);
            dispatch(updateCityAction(region))
        } catch (e) {
            alert(e.message)
        }
    }

export const deleteCity = (regionId, countryId, cityId) =>
    async (dispatch) => {
        try {
            await regionApi.deleteCity(regionId, countryId, cityId);
            dispatch(deleteCityAction(regionId, countryId, cityId))
        } catch (e) {
            alert(e.message)
        }
    }