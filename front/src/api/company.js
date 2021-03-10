import { getItem } from "../util/localStorage"

export const create = async (company) => {
    const response = await fetch("http://localhost:3001/company", { method: 'POST', body: JSON.stringify(company), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if(response.ok){
        return data
    } else {
        throw new Error(data.message)
    }
}

export const update = async (company) => {
    const response = await fetch("http://localhost:3001/company", { method: 'PUT', body: JSON.stringify(company), headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if(response.ok){
        return data
    } else {
        throw new Error(data.message)
    }
}

export const get = async () => {
    const response = await fetch("http://localhost:3001/company", { headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if(response.ok){
        return data
    } else {
        throw new Error(data.message)
    }
}

export const remove = async (companyId) => {
    const response = await fetch(`http://localhost:3001/company?companyId=${companyId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getItem("token") } })
    const data = await response.json()
    if(response.ok){
        return data
    } else {
        throw new Error(data.message)
    }
}