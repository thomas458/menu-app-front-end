import axios from "axios";
const REVIEW_API = "http://localhost:4000/api/reviews"
const MEAL_REVIEWS_API = "http://localhost:4000/api/meals"
const AUTHOR_REVIEWS_API = "http://localhost:4000/api/users"

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
