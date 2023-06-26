import axios from "axios";
const REVIEW_API = process.env.REVIEW_API||"http://localhost:4000/api/reviews"
const MEAL_REVIEWS_API = process.env.MEAL_REVIEWS_API||"http://localhost:4000/api/meals"
const AUTHOR_REVIEWS_API = process.env.AUTHOR_REVIEWS_API||"http://localhost:4000/api/users"

// const REVIEW_API = process.env.REVIEW_API
// const MEAL_REVIEWS_API = process.env.MEAL_REVIEWS_API
// const AUTHOR_REVIEWS_API = process.env.AUTHOR_REVIEWS_API

const api = axios.create({withCredentials: true});

export const createReview = async (review) => {
    const response = await api.post(REVIEW_API, review)
    return response.data
}
export const findReviewsByMeal = async (idMeal) => {
    const response = await api.get(`${MEAL_REVIEWS_API}/${idMeal}/reviews`)
    console.log("response", response)
    return response.data
}

export const findReviewsByAuthor = async (author) => {
    const response = await api.get(`${AUTHOR_REVIEWS_API}/${author}/reviews`)
    return response.data
}
export const deleteReview = async (rid) => {
    //const response = await axios.delete(`${AUTHOR_REVIEWS_API}/${rid}`)
    const response = await axios.delete(`http://localhost:4000/api/reviews/${rid}`)
    return response.data
}
export const getFiveRecentReviews = async () => {
    try {
        const response = await axios.get(`${REVIEW_API}/recent`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export const findReviewsByLoginUser = async (author) => {
    const response = await api.get(`${AUTHOR_REVIEWS_API}/${author}/reviews`)
    return response.data
}

