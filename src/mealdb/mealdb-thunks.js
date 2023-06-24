import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    findMealBySearchTerm,
    // findMealsById,
    findMealsByMealdbId,
    getRandomMeals,
    // getSingleRandomMeal
} from "./mealdb-service";

export const findMealBySearchTermThunk = createAsyncThunk(
    'findMealBySearchTerm',
    (term) => findMealBySearchTerm(term)
)

export const findMealByMealIdThunk = createAsyncThunk(
    'findMealByMealId',
    (idMeal) => findMealsByMealdbId(idMeal)
)

export const getRandomMealsThunk = createAsyncThunk(
    'randomMeal',
    (letter) => getRandomMeals(letter)
)

// export const getSingleRandomMealsThunk = createAsyncThunk(
//     'singleRandomMeal',
//     () => getSingleRandomMeal()
// )