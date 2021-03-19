import { GET_CITIES } from '../actions/index';

const initialCity = {
    cities: []
}

const cityReducer = (state = initialCity, { type, cities }) => {
    switch (type) {
        case GET_CITIES:
            return {
                ...state,
                cities: cities
            }
        default: return state
    }
}

export default cityReducer;