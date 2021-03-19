import { getItem } from "../util/localStorage"

export const createRegion = async (region) => {
    const response = await fetch("http://localhost:3001/region", { method: 'POST', body: JSON.stringify(region), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const updateRegion = async (region) => {
    const response = await fetch("http://localhost:3001/region", { method: 'PUT', body: JSON.stringify(region), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const deleteRegion = async (regionId) => {
    const response = await fetch(`http://localhost:3001/region?regionId=${regionId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const get = async () => {
    const response = await fetch("http://localhost:3001/region", { headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const createCountry = async (regionId, country) => {
    const response = await fetch("http://localhost:3001/country", { method: 'POST', body: JSON.stringify({ regionId, country }), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const updateCountry = async (country) => {
    const response = await fetch("http://localhost:3001/country", { method: 'PUT', body: JSON.stringify(country), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const deleteCountry = async (countryId) => {
    const response = await fetch(`http://localhost:3001/country?countryId=${countryId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const createCity = async (countryId, city) => {
    const response = await fetch("http://localhost:3001/city", { method: 'POST', body: JSON.stringify({ countryId, city }), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const updateCity = async (city) => {
    const response = await fetch("http://localhost:3001/city", { method: 'PUT', body: JSON.stringify(city), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const deleteCity = async (cityId) => {
    const response = await fetch(`http://localhost:3001/city?cityId=${cityId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const getCities = async () => {
    const response = await fetch("http://localhost:3001/city", { headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

