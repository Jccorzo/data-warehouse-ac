import { getItem } from "../util/localStorage"

export const create = async (user) => {
    const response = await fetch("http://localhost:3001/user", { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const login = async (user) => {
    const response = await fetch("http://localhost:3001/user/login", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) })
    const data = await response.json()
    if (response.status !== 200) {
        throw new Error(data.message)
    } else {
        return data
    }
}

export const update = async (user) => {
    const response = await fetch("http://localhost:3001/user", { method: 'PUT', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const get = async () => {
    const response = await fetch("http://localhost:3001/user", { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}

export const remove = async (userId) => {
    const response = await fetch(`http://localhost:3001/user?userId=${userId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    return data
}