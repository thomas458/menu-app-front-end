import {createSlice} from "@reduxjs/toolkit";
import {
    createReviewThunk, deleteReviewThunk,
    findReviewsByAuthorThunk, findReviewsByLoginUserThunk,
    findReviewsByMealThunk, getFiveRecentReviewsThunk
} from "./reviews-thunks";
import {findReviewsByLoginUser} from "./reviews-service";

const reviewsReducer = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        userReviews: []
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
        [findReviewsByLoginUserThunk.fulfilled]: (state, action) => {
            state.userReviews = action.payload
        }
    }
})

export default reviewsReducer.reducer