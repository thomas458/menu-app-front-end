import {createSlice} from "@reduxjs/toolkit";
import {
    findMealByIdThunk,
    findMealByMealIdThunk,
    findMealBySearchTermThunk,
    getRandomMealsThunk, getSingleRandomMealsThunk
} from "./mealdb-thunks";

const initialState = {
    meals: [],
    loading: false,
    details: {},
    randomMeals: [],
    meal:[]
}

const mealdbReducer = createSlice({
    name: 'mealdb',
    initialState,
    extraReducers: {
        [findMealBySearchTermThunk.fulfilled]: (state, action) =>{
            state.meals = action.payload
        },
        [findMealByMealIdThunk.fulfilled]: (state, action) =>{
            state.details = action.payload
        },
        [getRandomMealsThunk.fulfilled]: (state,action) =>{
            if(state.randomMeals === null  || state.randomMeals.length === 0){
                state.randomMeals = action.payload.meals
            }
        },
        [getSingleRandomMealsThunk.fulfilled]: (state, action) =>{
            state.singleMeal = action.payload
        }
    }
})

export default mealdbReducer.reducer