import axios from "axios"

const api = axios.create({
    baseURL :'https://yt-genai-p1lh.onrender.com',
    withCredentials :true
})
export async function register({username, email, password}) {
    try{
        const response = await api.post('/api/auth/register', {
            username,email, password
        })
        return response.data
    }catch(err){
        console.log(err)
        throw err
    }
}

export async function login({email, password}) {
    try{
        const response = await api.post('/api/auth/login',{
            email, password
        })
        return response.data
    }catch(err){
        console.log(err)
        throw err
    }
}


export async function logout(){
    try{
        const response = await api.get('/api/auth/logout')
        return response.data
    }catch(err){
        console.log(err)
        throw err
    }
}

export async function getme(){
    try{
        const response = await api.get('/api/auth/get-me')
        return response.data
    }catch(err){
        console.log(err)
        throw err
    }
}

export async function updateUser({username, email}) {
    try{
        const response = await api.put('/api/auth/update', {
            username,
            email
        })
        return response.data
    }catch(err){
        console.log(err)
        throw err
    }
}
