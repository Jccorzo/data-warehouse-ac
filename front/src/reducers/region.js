import { CREATE_CITY, CREATE_COUNTRY, CREATE_REGION, DELETE_CITY, DELETE_COUNTRY, DELETE_REGION, GET_REGIONS, UPDATE_CITY, UPDATE_COUNTRY, UPDATE_REGION } from "../actions";

const regionInitial = {
    regions: []
}

const regionReducer = (state = regionInitial, { type, region, regions, regionId, countryId, cityId, city, country }) => {
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
                regions: state.regions.map((currentRegion) => {
                    if (currentRegion._id === regionId) {
                        return {
                            ...currentRegion,
                            countries: [country, ...currentRegion.countries]
                        }
                    } else {
                        return currentRegion
                    }
                })
            }
        case UPDATE_COUNTRY:
            return {
                ...state,
                regions: state.regions.map(currentRegion => {
                    if (currentRegion._id === regionId) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => (currentCountry._id === country._id ? { ...currentCountry, name: country.name } : currentCountry))
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
                regions: state.regions.map((currentRegion) => {
                    if (currentRegion._id == regionId) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => {
                                if (currentCountry._id === countryId) {
                                    return {
                                        ...currentCountry,
                                        cities: [city, ...currentCountry.cities]
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
        case UPDATE_CITY:
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
                                        cities: currentCountry.cities.map(currentCity => (currentCity._id === city._id ? { ...currentCity, name: city.name } : currentCity))
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