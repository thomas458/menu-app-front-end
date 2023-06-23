import {createAsyncThunk} from "@reduxjs/toolkit";
import {createReview, findReviewsByAuthor, findReviewsByAuthorId, findReviewsByMeal} from "./reviews-service";

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

export const findReviewsByAuthorIdThunk = createAsyncThunk(
    'findReviewsByAuthorIdThunk',
    async (authorId) => findReviewsByAuthorId(authorId)
)