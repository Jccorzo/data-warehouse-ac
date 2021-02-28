
export const create = async (user) => {
    const response = await fetch("http://localhost:3001/user", { method: 'POST', body: user })
    const data = await response.json()
    return data
}

export const login = async (user) => {
    const response = await fetch("http://localhost:3001/user/login", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) })
    const data = await response.json()
    if(response.status !== 200 ){
        throw new Error(data.message)
    } else {
        return data
    }
}

export const update = async (user) => {
    const response = await fetch("http://localhost:3001/user", { method: 'PUT', body: user })
    const data = await response.json()
    return data
}

export const get = async () => {
    const response = await fetch("http://localhost:3001/user")
    const data = await response.json()
    return data
}

export const remove = async (userId) => {
    const response = await fetch(`http://localhost:3001/user?userId=${userId}`, { method: 'DELETE' })
    const data = await response.json()
    return data
}