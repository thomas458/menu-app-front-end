import {findAllMealsThunk, createMealsThunk, deleteMealsThunk} from "./meals-thunks";
import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    meals:[],
    loading: true
}

const mealsReducer = createSlice({
    name: 'meals',
    initialState: initialState,
    extraReducers: {
        [findAllMealsThunk.fulfilled]: (state, action) =>{
            state.meals = action.payload
            console.log("payload", action.payload)
        },
        [createMealsThunk.fulfilled]: (state, action) =>{
            console.log("thunk", action.payload)
            state.meals.push(action.payload)
        },
        [deleteMealsThunk.fulfilled]: (state, action) => {
            state.meals = state.meals.filter(m => m._id !== action.payload)
        }
    }
})

export default mealsReducer.reducer;