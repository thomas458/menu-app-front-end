import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

const USERS_URL = process.env.USERS_URL||'http://localhost:4000/users'
const LIKES_URL = 'http://localhost:4000/users/:uid/likes/:mid'
const ALBUM_URL=process.env.ALBUM_URL||"http://localhost:4000/api/albums/albumId"
const ALBUM_Like=process.env.ALBUM_Like||"http://localhost:4000/api/albums/i/like"

export const userLikesMeal = async (uid, mid) => {
    const response = await axios.post(`${USERS_URL}/${uid}/likes/${mid}`)
    return response.data
}


export const likeAlbum = async (albumId, album) => {
    const response = await request.post(
        `${ALBUM_URL}/${albumId}/like`,
        album
    );
    return response.data;
};

export const findAlbumsILike = async () => {
    //const response = await request.get(`http://localhost:4000/api/albums/i/like`);
    const response = await request.get(ALBUM_Like);
    return response.data;
};