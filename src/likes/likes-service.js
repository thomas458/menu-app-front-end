import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

const USERS_URL = 'http://localhost:4000/users'
const LIKES_URL = 'http://localhost:4000/users/:uid/likes/:mid'

export const userLikesMeal = async (uid, mid) => {
    const response = await axios.post(`${USERS_URL}/${uid}/likes/${mid}`)
    return response.data
}


export const likeAlbum = async (albumId, album) => {
    const response = await request.post(
        `http://localhost:4000/api/albums/albumId/${albumId}/like`,
        album
    );
    return response.data;
};