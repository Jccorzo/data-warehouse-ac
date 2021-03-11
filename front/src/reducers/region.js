import { CREATE_CITY, CREATE_COUNTRY, CREATE_REGION, DELETE_CITY, DELETE_COUNTRY, DELETE_REGION, GET_REGIONS, UPDATE_CITY, UPDATE_COUNTRY, UPDATE_REGION } from "../actions";

const regionInitial = {
    regions: []
}

const regionReducer = (state = regionInitial, { type, region, regions, regionId, countryId, cityId }) => {
    switch (type) {
        case CREATE_REGION:
            return {
                ...state,
                regions: [...state.regions, region]
            }
        case UPDATE_REGION:
            return {
                ...state,
                regions: state.regions.map((currentRegion) => (currentRegion._id === region._id ? { ...currentRegion, name: region.name } : currentRegion))
            }
        case DELETE_REGION:
            return {
                ...state,
                regions: state.regions.filter(currentRegion => currentRegion._id !== regionId)
            }
        case GET_REGIONS:
            return {
                ...state,
                regions: regions
            }
        case CREATE_COUNTRY:
            return {
                ...state,
                regions: state.regions.map((currentRegion) => (currentRegion._id === region._id ? region : currentRegion))
            }
        case UPDATE_COUNTRY:
            return {
                ...state,
                regions: state.regions.map(currentRegion => {
                    if (currentRegion._id === region._id) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => (currentCountry._id === region.country._id ? { ...currentCountry, name: region.country.name } : currentCountry))
                        }
                    } else {
                        return currentRegion
                    }
                })
            }
        case DELETE_COUNTRY:
            return {
                ...state,
                regions: state.regions.map(currentRegion => {
                    if (currentRegion._id === regionId) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.filter(currentCountry => currentCountry._id !== countryId)
                        }
                    } else {
                        return currentRegion
                    }
                })
            }
        case CREATE_CITY:
            return {
                ...state,
                regions: state.regions.map((currentRegion) => (currentRegion._id === region._id ? region : currentRegion))
            }
        case UPDATE_CITY:
            return {
                ...state,
                regions: state.regions.map(currentRegion => {
                    if (currentRegion._id === region._id) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => {
                                if (currentCountry._id === region.country._id) {
                                    return {
                                        ...currentCountry,
                                        cities: currentCountry.cities.map(currentCity => (currentCity._id === region.country.city._id ? { ...currentCity, name: region.country.city.name } : currentCity))
                                    }
                                } else {
                                    return currentCountry
                                }
                            })
                        }
                    } else {
                        return currentRegion
                    }
                })
            }
        case DELETE_CITY:
            return {
                ...state,
                regions: state.regions.map(currentRegion => {
                    if (currentRegion._id === regionId) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => {
                                if (currentCountry._id === countryId) {
                                    return {
                                        ...currentCountry,
                                        cities: currentCountry.cities.filter(currentCity => (currentCity._id !== cityId))
                                    }
                                } else {
                                    return currentCountry
                                }
                            })
                        }
                    } else {
                        return currentRegion
                    }
                })
            }
        default: return state
    }

}

export default regionReducer;