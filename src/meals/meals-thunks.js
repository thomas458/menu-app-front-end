import {createAsyncThunk} from "@reduxjs/toolkit";
import {createMeal, deleteMeal, findAllMeals} from "./meals-service";

export const createMealsThunk = createAsyncThunk(
    'createMeal',
    async (newMeal) => {
        console.log("createMealsThunk()", newMeal)
        return createMeal(newMeal)

    }
)

export const findAllMealsThunk = createAsyncThunk(
    'findAllMeal',
    () => findAllMeals()
)

export const updateMealsThunk = {}

export const deleteMealsThunk = createAsyncThunk(
    'deleteMeal',
    (mid) => deleteMeal(mid)
)
