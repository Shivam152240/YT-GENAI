import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : 'https://yt-genai-1.onrender.com'),
    withCredentials: true
})
export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email, password
        })
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}


export async function logout() {
    try {
        const response = await api.get('/api/auth/logout')
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function getme() {
    try {
        const response = await api.get('/api/auth/get-me')
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function updateUser({ username, email }) {
    try {
        const response = await api.put('/api/auth/update', {
            username,
            email
        })
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}
