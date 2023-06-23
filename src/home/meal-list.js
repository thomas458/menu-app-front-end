import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllMealsThunk} from "../meals/meals-thunks";


const MealList = () => {

    const dispatch = useDispatch();
    const {meals, loading} = useSelector((state) => state.mealdb)


    useEffect(() => {
        dispatch(findAllMealsThunk())
    }, []);

    return (

        <ul className="list-group">
            {loading && (
                <ul className="list-group-item">
                    Loading...
                </ul>
            )}
            <h2>your meals</h2>
            {meals.map((meal) => (
                <ul key={meal._id}>
                    {meal.name}
                </ul>
            ))}
        </ul>
    );
};
export default MealList;