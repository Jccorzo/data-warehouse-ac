import { GET_CITIES } from './index';
import { getCities as getCitiesApi } from '../api/region';

const getCitiesAction = (cities) => ({ type: GET_CITIES, cities })

export const getCities = () =>
    async (dispatch) => {
        try {
            const data = await getCitiesApi();
            dispatch(getCitiesAction(data.cities))
        } catch (e) {
            alert(e.message)
        }
    }