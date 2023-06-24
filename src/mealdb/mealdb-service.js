import axios from "axios";

const SEARCH_URL = 'https://themealdb.com/api/json/v1/1/search.php?s='
const DETAIL_URL = 'https://themealdb.com/api/json/v1/1/lookup.php?i='
const RANDOM_URL = 'https://themealdb.com/api/json/v1/1/search.php?f='
const LOOKUP_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
const SINGLE_RANDOM_URL = 'https://themealdb.com/api/json/v1/1/random.php'

export const findMealBySearchTerm = async (term) => {
    console.log(term)
    const response = await axios.get(`${SEARCH_URL}${term}`)
    console.log(response)
    return response.data.meals
}

export const findMealsByMealdbId = async (idMeal) => {
    const response = await axios.get(`${DETAIL_URL}${idMeal}`)
    return response.data
}

export const getRandomMeals = async (letter) => {
    const response = await axios.get(`${RANDOM_URL}${letter}`)
    return response.data
}

export const findMealsById = async (idMeal) => {
    const response = await axios.get(`${LOOKUP_URL}${idMeal}`)
    return response.data
}

export const getSingleRandomMeal = async () => {
    const response = await axios.get(`${SINGLE_RANDOM_URL}`)
    return response.data
}