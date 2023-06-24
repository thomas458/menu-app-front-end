import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createReview,
    deleteReview,
    findReviewsByAuthor,
    findReviewsByMeal, getFiveRecentReviews, findReviewsByLoginUser
} from "./reviews-service";

export const createReviewThunk = createAsyncThunk(
    'createReview',
    async (review) => createReview(review)
)

export const findReviewsByMealThunk = createAsyncThunk(
'findReviewsByMealThunk',
async (idMeal) => findReviewsByMeal(idMeal)
)

export const findReviewsByAuthorThunk = createAsyncThunk(
'findReviewsByAuthorThunk',
async (author) => findReviewsByAuthor(author)
)

export const deleteReviewThunk = createAsyncThunk(
    'deleteReview',
    async (_id) => {
        await deleteReview(_id)
        return _id
    })
export const getFiveRecentReviewsThunk = createAsyncThunk(
    'getFiveRecentReviewsThunk',
    async (review) => getFiveRecentReviews()
)

export const findReviewsByLoginUserThunk = createAsyncThunk(
    'findReviewsByLoginUserThunk',
    async(author) =>findReviewsByLoginUser(author)
)