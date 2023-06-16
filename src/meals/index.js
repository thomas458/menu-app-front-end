import Nav from "../nav";
import {findAllMealsThunk, createMealsThunk} from "./meals-thunks";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const Meals = () => {
    const meals = useSelector((state) => state.meals)
    const [meal, setMeal] = useState({name: 'New Meal'})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllMealsThunk())
        }, [])
    console.log(meals)
    return (
        <>
            <Nav/>
            <h1>Meals</h1>
            <ul>
                <li>
                    <input
                        onChange={(e) =>
                    setMeal({...meal, name:e.target.value})}
                        value={meal.name}/>
                    <button onClick={() => {
                        console.log("onClick")
                        dispatch(createMealsThunk(
                            {
                                name: meal.name
                            }
                        ))
                    }}>Create</button>
                </li>
                {
                    meals.map((meal) =>
                    <li key={meal._id}>
                        {meal.name}
                    </li>)
                }
            </ul>
        </>
    )
}

export default Meals;