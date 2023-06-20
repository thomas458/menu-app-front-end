import axios from "axios";
const Meal_API_URL = 'http://localhost:4000/meals'

export const createMeal = async (newMeal) => {
    const response = await axios.post(Meal_API_URL, newMeal)
    const actualMeal = response.data
    console.log("actual meal response", actualMeal)
    return actualMeal
}
export const findAllMeals = async() => {
    const response = await axios.get(Meal_API_URL)
    const meals = response.data
    return meals
}
export const updateMeal = async () => {}

export const deleteMeal = async (mid) => {
    const response = await axios.delete(`${Meal_API_URL}/${mid}`)
    const status = response.data
    return mid;
}
