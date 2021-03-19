import { getItem } from "../util/localStorage"

export const create = async (contact) => {
    const response = await fetch("http://localhost:3001/contact", { method: 'POST', body: JSON.stringify(contact), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const update = async (contact) => {
    const response = await fetch("http://localhost:3001/contact", { method: 'PUT', body: JSON.stringify(contact), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const get = async () => {
    const response = await fetch("http://localhost:3001/contact", { headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const deleteSelectedContacts = async (contactIds) => {
    const response = await fetch(`http://localhost:3001/contact?contactIds=${contactIds}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const deleteContactById = async (contactId) => {
    const response = await fetch(`http://localhost:3001/contact/${contactId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}

export const getByWord = async (word) => {
    const response = await fetch(`http://localhost:3001/contact?word=${word}`, { headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw new Error(data.message)
    }
}