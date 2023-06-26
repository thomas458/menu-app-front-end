import axios from "axios";
const BASE_URL = process.env.BASE_URL||'http://localhost:4000'
const USER_API_URL =process.env.USER_API_URL||'http://localhost:4000/users';

// const BASE_URL = process.env.BASE_URL
// const USER_API_URL =process.env.USER_API_URL

const api = axios.create({ withCredentials: true });



export const createUser = async () => {

}

export const findAllUsers = async () => {
    //const response = await axios.get('http://localhost:4000/users')
    const response = await axios.get(USER_API_URL)
    return response.data

}

export const register = async(user) => {
    const response = await api.post(`${BASE_URL}/register`, user)
    return response.data
}

export const login = async(user) => {
    const response = await api.post(`${BASE_URL}/login`, user)
    return response.data
}

export const profile = async () => {
    const response = await api.get(`${BASE_URL}/profile`)
    return response.data
}

export const logout = async () => {
    const response = await api.post(`${BASE_URL}/logout`)
    return response.data
}


export const deleteUser = async (uid) => {
    const response = await api.delete(`${USER_API_URL}/${uid}`)
    return response.data
}
export const updateUser = async (uid, user) => {
    const response = await api.put(`${USER_API_URL}/${uid}`, user)
    return response.data;
}

export const findUserById = async (uid) => {
    const response = await api.get(`${USER_API_URL}/${uid}`)
    return response.data
}

