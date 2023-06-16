import meals from "./index";
import {findAllMealsThunk, createMealsThunk} from "./meals-thunks";
import {createSlice} from "@reduxjs/toolkit";

const mealsReducer = createSlice({
    name: 'meals',
    initialState: [],
    extraReducer: {
        [findAllMealsThunk.fulfilled]: (state, action) =>{
            state = action.payload
        },
        [createMealsThunk.fulfilled]: (state, action) =>{
            console.log("thunk", action.payload)
            state.push(action.payload)
        }
    }
})

export default mealsReducer.reducer;