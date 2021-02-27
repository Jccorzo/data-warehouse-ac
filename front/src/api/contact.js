
const create = async (contact) => {
    const response = await fetch("http://localhost:3001/contact", { method: 'POST', body: contact })
    const data = await response.json()
    return data
}

const update = async (contact) => {
    const response = await fetch("http://localhost:3001/contact", { method: 'PUT', body: contact })
    const data = await response.json()
    return data
}

const get = async () => {
    const response = await fetch("http://localhost:3001/contact")
    const data = await response.json()
    return data
}

const remove = async (contactId) => {
    const response = await fetch(`http://localhost:3001/company?companyId=${contactId}`, { method: 'DELETE' })
    const data = await response.json()
    return data
}