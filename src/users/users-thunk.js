import {createAsyncThunk} from "@reduxjs/toolkit";

import {findAllUsers, register, login, logout, profile, deleteUser, findUserById, updateUser} from "./users-service";


export const findAllUsersThunk = createAsyncThunk(
    'findAllUsers',
    async () =>  await findAllUsers()
)

export const findUserByIdThunk = createAsyncThunk(
    'findUserById',
    async (id)=> await findUserById(id)
)

export const registerThunk = createAsyncThunk(
    'register',
    async (user) => await register(user)
)

export const logoutThunk = createAsyncThunk(
    'logout',
    async () => await logout()
)

export const loginThunk = createAsyncThunk(
    'login',
    async (user) => await login(user)
)

export const profileThunk = createAsyncThunk(
    'profile',
    async () => await profile()
)


export const updateUserThunk = createAsyncThunk(
    'update',
    async (user) => {
        const status = await updateUser(user._id, user);
        return user;
    }
);

export const deleteUserThunk = createAsyncThunk(
    'deleteUser',
    async (userId) => {
        await deleteUser(userId)
        return userId
    })

