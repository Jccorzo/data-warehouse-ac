
export const create = async (company) => {
    const response = await fetch("http://localhost:3001/company", { method: 'POST', body: company })
    const data = await response.json()
    return data
}

export const update = async (company) => {
    const response = await fetch("http://localhost:3001/company", { method: 'PUT', body: company })
    const data = await response.json()
    return data
}

export const get = async () => {
    const response = await fetch("http://localhost:3001/company")
    const data = await response.json()
    return data
}

export const remove = async (companyId) => {
    const response = await fetch(`http://localhost:3001/company?companyId=${companyId}`, { method: 'DELETE' })
    const data = await response.json()
    return data
}