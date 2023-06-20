import {userLikesMeal} from "./likes-service";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const userLikesMealThunk = createAsyncThunk(
    'userLikesMeal',
    (uid, mid) => userLikesMeal(uid, mid)
)
