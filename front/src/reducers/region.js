import { CREATE_CITY, CREATE_COUNTRY, CREATE_REGION, DELETE_CITY, DELETE_COUNTRY, DELETE_REGION, GET_REGIONS, UPDATE_CITY, UPDATE_COUNTRY } from "../actions";

const regionInitial = {
    regions: []
}

const regionReducer = (state = regionInitial, { type, region, regions, regionId, countryId, cityId }) => {
    switch (type) {
        case CREATE_REGION:
            return {
                ...state,
                regions: [region, ...state.regions]
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
                regions: state.regions.map(currentRegion => {
                    if (currentRegion === region._id) {
                        return {
                            ...currentRegion,
                            countries: [region.country, ...currentRegion.countries]
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
                    if (currentRegion === region._id) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => (currentCountry._id === region.country._id ? region.country : currentCountry))
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
                    if (currentRegion === regionId) {
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
                regions: state.regions.map(currentRegion => {
                    if (currentRegion === region._id) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => {
                                if (currentCountry === region.country._id) {
                                    return {
                                        ...currentCountry,
                                        cities: [region.country.city, ...currentCountry.cities]
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
                    if (currentRegion === region._id) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => {
                                if (currentCountry === region.country._id) {
                                    return {
                                        ...currentCountry,
                                        cities: currentCountry.cities.map(currentCity => (currentCity._id === region.country.city._id ? region.country.city : currentCity))
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
                    if (currentRegion === regionId) {
                        return {
                            ...currentRegion,
                            countries: currentRegion.countries.map(currentCountry => {
                                if (currentCountry === countryId) {
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
        default: return regionInitial
    }

}

export default regionReducer;