import {createSlice} from "@reduxjs/toolkit";

import {
    findAllUsersThunk,
    registerThunk,
    loginThunk,
    profileThunk,
    logoutThunk,

    updateUserThunk,

    deleteUserThunk,
    findUserByIdThunk
} from "./users-thunk";


const usersReducer = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        users:[],
        currentUser: null,
        error: null
    },
    reducers: {
    },
    extraReducers: {
        [findUserByIdThunk.fulfilled] : (state, action) => {
            state.publicProfile = action.payload
        },
        [findAllUsersThunk.fulfilled]: (state, action) =>{
            state.users = action.payload
        },
        [registerThunk.fulfilled] : (state, action) => {
            state.currentUser = action.payload
        },
        [registerThunk.rejected] : (state, action) => {
            state.error = action.payload
            state.currentUser = null
        },
        [loginThunk.fulfilled] : (state, action) => {
            state.currentUser = action.payload
        },
        [loginThunk.rejected] : (state, action) => {
            state.error = action.payload
            state.currentUser = null
        },
        [profileThunk.fulfilled] : (state, action) => {
            state.currentUser = action.payload
        },
        [profileThunk.rejected] : (state, action) => {
            state.error = action.payload
            state.currentUser = null
        },
        [logoutThunk.fulfilled] : (state, action) => {
            state.currentUser = null
        },

        [updateUserThunk.fulfilled] : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        [deleteUserThunk.fulfilled] :
            (state, { payload }) => {
                state.loading = false
                state.tuits = state.users.filter(u => u._id !== payload)
            },
    }
})

export default usersReducer.reducer