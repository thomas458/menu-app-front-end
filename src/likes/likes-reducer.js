import {createSlice} from "@reduxjs/toolkit";
import {userLikesMealThunk} from "./likes-thunks";

const initialState = {
    likes: [],
    loading: false
}

export const likesReducer = createSlice({
    name: 'likes',
    initialState,
    extraReducers: {
        [userLikesMealThunk.fulfilled]: (state, action) => {
            state.likes.push(action.payload)
        }
    }
})