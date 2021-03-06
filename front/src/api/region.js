import { getItem } from "../util/localStorage"

export const createRegion = async (region) => {
    const response = await fetch("http://localhost:3001/region", { method: 'POST', body: JSON.stringify(region), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const deleteRegion = async (regionId) => {
    const response = await fetch(`http://localhost:3001/region?regionId=${regionId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const get = async () => {
    const response = await fetch("http://localhost:3001/region", { headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") }})
    const data = await response.json()
    return data
}

export const createCountry = async (country) => {
    const response = await fetch("http://localhost:3001/region/country", { method: 'POST', body: JSON.stringify(country), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const updateCountry = async (country) => {
    const response = await fetch("http://localhost:3001/region/country", { method: 'PUT', body: JSON.stringify(country), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const deleteCountry = async (regionId, countryId) => {
    const response = await fetch(`http://localhost:3001/region/country?regionId=${regionId}&countryId=${countryId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const createCity = async (region) => {
    const response = await fetch("http://localhost:3001/region/country/city", { method: 'POST', body: JSON.stringify(region), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const updateCity = async (region) => {
    const response = await fetch("http://localhost:3001/region/country/city", { method: 'PUT', body: JSON.stringify(region), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const deleteCity = async (regionId, countryId, cityId) => {
    const response = await fetch(`http://localhost:3001/region/country/city?regionId=${regionId}&countryId=${countryId}&cityId=${cityId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}



