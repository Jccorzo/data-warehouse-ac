
const createRegion = async (region) => {
    const response = await fetch("http://localhost:3001/region", { method: 'POST', body: region })
    const data = await response.json()
    return data
}

const deleteRegion = async (regionId) => {
    const response = await fetch(`http://localhost:3001/region?regionId=${regionId}`, { method: 'DELETE' })
    const data = await response.json()
    return data
}

const get = async () => {
    const response = await fetch("http://localhost:3001/region")
    const data = await response.json()
    return data
}

const createCountry = async (country) => {
    const response = await fetch("http://localhost:3001/region/country", { method: 'POST', body: country })
    const data = await response.json()
    return data
}

const updateCountry = async (country) => {
    const response = await fetch("http://localhost:3001/region/country", { method: 'PUT', body: country })
    const data = await response.json()
    return data
}

const deleteCountry = async (regionId, countryId) => {
    const response = await fetch(`http://localhost:3001/region/country?regionId=${regionId}&countryId=${countryId}`, { method: 'DELETE' })
    const data = await response.json()
    return data
}

const createCity = async (region) => {
    const response = await fetch("http://localhost:3001/region/country/city", { method: 'POST', body: region })
    const data = await response.json()
    return data
}

const updateCity = async (region) => {
    const response = await fetch("http://localhost:3001/region/country/city", { method: 'PUT', body: region })
    const data = await response.json()
    return data
}

const deleteCity = async (regionId, countryId, cityId) => {
    const response = await fetch(`http://localhost:3001/region/country/city?regionId=${regionId}&countryId=${countryId}&cityId=${cityId}`, { method: 'DELETE' })
    const data = await response.json()
    return data
}



