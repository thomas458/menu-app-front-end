import {createSlice} from "@reduxjs/toolkit";
import {
    createReviewThunk, deleteReviewThunk,
    findReviewsByAuthorThunk,
    findReviewsByMealThunk, getFiveRecentReviewsThunk
} from "./reviews-thunks";

const reviewsReducer = createSlice({
    name: 'reviews',
    initialState: {
        reviews: []
    },
    extraReducers: {
        [createReviewThunk.fulfilled]: (state, action) => {
            state.reviews.push(action.payload)
        },
        [findReviewsByMealThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
        [findReviewsByAuthorThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
        [deleteReviewThunk.fulfilled]:
            (state, {payload}) => {
                state.reviews = state.reviews.filter(r => r._id !== payload)
            },
        [getFiveRecentReviewsThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
    }
})

export default reviewsReducer.reducer