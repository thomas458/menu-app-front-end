import axios from "axios";

const FOLLOWS_API = process.env.FOLLOWS_API||'http://localhost:4000/follows'
const USERS_API = process.env.USERS_API||'http://localhost:4000/users'

// const FOLLOWS_API = process.env.FOLLOWS_API
// const USERS_API = process.env.USERS_API

const api = axios.create({withCredentials: true});

export const followUser = async (follow) => {
    const response = await api.post(`${FOLLOWS_API}`, follow)
    return response.data
}

export const findFollowers = async (followed) => {
    const response = await api.get(`${USERS_API}/${followed}/followers`)
    return response.data
}

export const findFollowing = async (follower) => {
    const response = await api.get(`${USERS_API}/${follower}/following`)
    return response.data
}
